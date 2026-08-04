const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const fs = require("fs");

describe("Prueba Eliminar Rifa", function () {

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

    it("Debe eliminar una rifa correctamente", async function () {

        // Abrir aplicación
        await driver.get("http://localhost:5173/");

        // Login
        await driver.findElement(By.id("correo")).sendKeys("admin@rifapro.com");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.id("btnLogin")).click();

        await driver.wait(until.urlContains("/dashboard"), 5000);

        // Ir a Gestión de Rifas
        await driver.findElement(By.id("btnRifas")).click();

        await driver.wait(
            until.elementLocated(By.id("tablaRifas")),
            5000
        );

        // Captura antes de eliminar
        let antes = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/eliminar-rifa.png",
            antes,
            "base64"
        );

        // Pulsar botón eliminar
        await driver.findElement(By.id("eliminar-1")).click();

        // Esperar el botón de confirmación de SweetAlert2
        await driver.wait(
            until.elementLocated(By.className("swal2-confirm")),
            5000
        );

        // Confirmar eliminación
        await driver.findElement(By.className("swal2-confirm")).click();

        await driver.sleep(2500);

        // Captura después de eliminar
        let despues = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/rifa-eliminada.png",
            despues,
            "base64"
        );

        // Verificar que ya no existe la PlayStation 5
        let tabla = await driver.findElement(By.id("tablaRifas")).getText();

        expect(tabla).to.not.include("PlayStation 5");

    });

});