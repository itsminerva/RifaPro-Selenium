const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const fs = require("fs");

describe("Prueba Editar Rifa", function () {

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

    it("Debe editar una rifa correctamente", async function () {

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

        // Editar la primera rifa (PlayStation 5)
        await driver.findElement(By.id("editar-1")).click();

        // Limpiar campos
        let nombre = await driver.findElement(By.id("txtNombre"));
        await nombre.clear();
        await nombre.sendKeys("PlayStation 5 Slim");

        let precio = await driver.findElement(By.id("txtPrecio"));
        await precio.clear();
        await precio.sendKeys("15");

        // Captura antes de guardar
        let antes = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/editar-rifa.png",
            antes,
            "base64"
        );

        // Guardar cambios
        await driver.findElement(By.id("btnGuardar")).click();

        await driver.sleep(2500);

        // Verificar cambio
        let tabla = await driver.findElement(By.id("tablaRifas")).getText();

        expect(tabla).to.include("PlayStation 5 Slim");

        // Captura final
        let despues = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/rifa-editada.png",
            despues,
            "base64"
        );

    });

});