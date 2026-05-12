import {test} from '@playwright/test';


//Annotations
//Skip
test.skip('Skip this test', async ({page}) => {

});

//Fail
test('Not yet ready', async ({page}) => {
    test.fail(true, 'This test is expected to fail');
});

//Fixme
test('Test to be fixed', async ({page}) => {
    test.fixme(true, 'This test is expected to be fixed');
});

//Slow
test('Slow test', async ({page}) => {
    test.slow();
});
/*
//Only
test.only('Only execute this test', async ({page}) => {
});
*/

//Tags
/*
@sanity
*/

//@fast
test('Test login page @fast', async ({page}) => {
});

//@smoke
test('Test login page @smoke', async ({page}) => {
});