const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");
const fs = require("fs");

describe("Prueba Login Rifa", function () {

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

    it("Debe iniciar sesión y entrar al dashboard", async function () {

        await driver.get("http://localhost:5173/");

        // Buscar campos del login
        let correo = await driver.findElement(By.id("correo"));
        let password = await driver.findElement(By.id("password"));
        let boton = await driver.findElement(By.id("btnLogin"));

        // Verificar que existen
        expect(correo).to.exist;
        expect(password).to.exist;
        expect(boton).to.exist;

        // Escribir credenciales
        await correo.clear();
        await correo.sendKeys("admin@rifapro.com");

        await password.clear();
        await password.sendKeys("123456");

        // Captura antes del login
        let screenshotAntes = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/login-con-datos.png",
            screenshotAntes,
            "base64"
        );

        // Presionar botón login
        await boton.click();

        // Esperar redirección
        await driver.sleep(2000);

        // Verificar que entró al dashboard
        let url = await driver.getCurrentUrl();

        expect(url).to.include("/dashboard");

        // Captura del dashboard
        let screenshotDespues = await driver.takeScreenshot();

        fs.writeFileSync(
            "screenshots/dashboard.png",
            screenshotDespues,
            "base64"
        );

    });

});