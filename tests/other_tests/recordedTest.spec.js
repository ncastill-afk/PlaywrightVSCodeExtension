import { test, expect } from '@playwright/test';
let context;
let page;

//Pasa antes de todo
test.beforeAll(async({browser}) => {
  context = await browser.newContext();
  await context.tracing.start(
    { 
       screenshots: true, snapshots: true, 
    }
  )
  page= await context.newPage();
})

//Pasa después de todo
test.afterAll (async() => {
  console.log('Stopping trace...');
  await context.tracing.stop(
    { 
      //Detener la captura de pantalla e indicamos la ruta del archivo trace
      path: 'testTrace.zip',
    }
  );
  console.log('Trace saved');
  await context.close();
  console.log('Después del close');
})

test('test', async () => {

  //Tomar screenshot de la página
  //await context.tracing.start({ screenshots: true, snapshots: true });

  //Test code
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  /*await page.locator('iframe[name="a-4g3ap2n6n6g4"]').contentFrame().getByRole('checkbox', { name: 'No soy un robot' }).click();
  await page.locator('iframe[name="c-4g3ap2n6n6g4"]').contentFrame().locator('[id="0"]').click();
  await page.locator('iframe[name="c-4g3ap2n6n6g4"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-4g3ap2n6n6g4"]').contentFrame().locator('[id="5"]').click();
  await page.locator('iframe[name="c-4g3ap2n6n6g4"]').contentFrame().getByRole('button', { name: 'Verificar' }).click();*/
  //await page.getByRole('link', { name: 'Test Login' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.locator('#main-container').click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();

  //Detener la captura de pantalla e indicamos la ruta del archivo trace
  //await context.tracing.stop({ path: 'testTrace.zip' });
  
});