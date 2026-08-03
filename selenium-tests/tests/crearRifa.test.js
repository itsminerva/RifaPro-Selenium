const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const fs = require("fs");

describe("Prueba Crear Rifa", function () {

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

    it("Debe crear una nueva rifa", async function () {

        await driver.get("http://localhost:5174/");

        // Login
        await driver.findElement(By.id("correo")).sendKeys("admin@rifapro.com");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.id("btnLogin")).click();

        await driver.wait(until.urlContains("/dashboard"), 5000);

        // Ir a Gestión de Rifas
        await driver.findElement(By.id("btnRifas")).click();

        await driver.wait(until.elementLocated(By.id("txtNombre")),5000);

        // Crear rifa
        await driver.findElement(By.id("txtNombre")).sendKeys("Nintendo Switch");

        await driver.findElement(By.id("txtPrecio")).sendKeys("25");

        await driver.findElement(By.id("txtFecha")).sendKeys("30-08-2026");

        let antes = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/crear-rifa.png",
            antes,
            "base64"
        );

        await driver.findElement(By.id("btnGuardar")).click();

        await driver.sleep(2500);

        let despues = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/rifa-creada.png",
            despues,
            "base64"
        );

        let tabla = await driver.findElement(By.id("tablaRifas")).getText();

        expect(tabla).to.include("Nintendo Switch");

    });

});