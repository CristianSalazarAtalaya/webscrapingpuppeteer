const puppeteer = require("puppeteer");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  console.log("lanzamos el navegador");

  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  //Vamos a l pagina
  await page.goto("https://slcp.mtc.gob.pe/");

  //Cambiamos el tipo de búsqueda
  await page.evaluate(() => {
    document.getElementById("rbtnlBuqueda_2").click();
  });
  const hola = await page.evaluate(() => {
    return [document.getElementById("preloader")][0].innerHTML;
  });

  await page.screenshot({ path: "google.png" });

  do {
    await sleep(500);
    var preloader = await page.evaluate(() => {
      return [document.getElementById("preloader")][0].innerHTML;
    });
  } while (preloader.trim() == "");

  // #hplogo - selector
  await page.waitForSelector("#imgCaptcha"); // wait for the selector to load
  const logo = await page.$("#imgCaptcha"); // declare a variable with an ElementHandle
  const box = await logo.boundingBox(); // this method returns an array of geometric parameters of the element in pixels.
  let x = box["x"]; // coordinate x
  let y = box["y"]; // coordinate y
  let w = box["width"]; // area width
  let h = box["height"]; // area height
  x = x + 50;
  w = 120;
  y = y + 5;
  h = h - 10;
  await page.screenshot({
    path: "logo.jpg",
    clip: { x: x, y: y, width: w, height: h },
  }); // take screenshot of the required area in puppeteer

  await page.screenshot({ path: "google2.png" });

  //browser.close();
  console.log("Ceramos el navegador");
})();
