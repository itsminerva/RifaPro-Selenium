const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const fs = require("fs");

describe("Prueba Comprar Boletos", function () {

    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder()
            .forBrowser("chrome")
            .build();
    });

    after(async function () {
        await driver.quit();
    });

    it("Debe seleccionar boletos y realizar la compra", async function () {

        // Abrir aplicación
        await driver.get("http://localhost:5174/");

        // Login
        await driver.findElement(By.id("correo")).sendKeys("admin@rifapro.com");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.id("btnLogin")).click();

        await driver.wait(until.urlContains("/dashboard"), 5000);

        // Ir a Comprar Boletos
        await driver.findElement(By.id("btnComprar")).click();

        await driver.wait(
            until.elementLocated(By.id("boleto-1")),
            5000
        );

        // Seleccionar tres boletos
        await driver.findElement(By.id("boleto-1")).click();
        await driver.findElement(By.id("boleto-5")).click();
        await driver.findElement(By.id("boleto-10")).click();

        // Captura antes de comprar
        let antes = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/comprar-boletos.png",
            antes,
            "base64"
        );

        // Confirmar compra
        await driver.findElement(By.id("btnComprar")).click();

        // Esperar el mensaje de éxito
        await driver.wait(
            until.elementLocated(By.className("swal2-popup")),
            5000
        );

        // Captura del resultado
        let despues = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/compra-realizada.png",
            despues,
            "base64"
        );

        // Verificar que apareció el mensaje
        let titulo = await driver.findElement(
            By.className("swal2-title")
        ).getText();

        expect(titulo).to.equal("Compra realizada");

    });

});