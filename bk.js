const puppeteer = require("puppeteer");

(async () => {
  console.log("lanzamos el navegador");

  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  //Vamos a l pagina
  await page.goto("https://slcp.mtc.gob.pe/");
  
  //Primeras acciones
//   const h1 = await page.evaluate(() => {
//     const h1 = document.querySelector("h1");

//     [...document.getElementsByTagName("a")]
//       .filter((element) => element.textContent == "Discusión")[1]
//       .click();

//     return h1.innerHTML;
//   });
//   console.log(h1);

    //Cambiamos el tipo de búsqueda
    await page.evaluate(() => {
    document.getElementById("rbtnlBuqueda_2").click();
        await page.screenshot({ path: "google.png" });
    });


    

  //browser.close();
  console.log("Ceramos el navegador");
})();
