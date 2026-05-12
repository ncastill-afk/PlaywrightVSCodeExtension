
import { test, expect } from '@playwright/test';

//How to run a Get API Request
test('Get API Request', async ({ request }) => {

    //const response= await request.get('https://reqres.in/api/users/2');
    //Get Method
    const response= await request.get('https://reqres.in/api/users?page=2', {
        headers: {
            'x-api-key': 'free_user_3DKEPYSm43L3yEnPAcpu09JQDjX',
        },
    });
    console.log(response.status());
    console.log(await response.text());   
    //Validate 200 status response ok
    expect(response.status()).toBe(200);
    
    //Validate text contained inthe json file
    const text= await response.text();
    expect(text).toContain('Melissa');
    
    //Show response json message
    console.log(await response.json());
 
    
});

//How to run a POST API Request
test('POST API Request', async ({ request }) => {

    //const response= await request.get('https://reqres.in/api/users');
    //Get Method
    const response= await request.post('https://reqres.in/api/users?page=2', {
        headers: {
            'x-api-key': 'free_user_3DKEPYSm43L3yEnPAcpu09JQDjX',
        },
        data: {
            first_name: 'Rachel',
            last_name: 'Howell',
        }
    });
    //Validate 201 status response ok
    expect(response.status()).toBe(201);

    console.log(response.status());
    console.log(await response.text());   
    
    //Validate text contained inthe json file
    const text= await response.text();
    expect(text).toContain('Rachel');
    
    //Show response json message
    console.log(await response.json());
 
    
});

//How to run a PUT API Request
test('PUT API Request', async ({ request }) => {

    //const response= await request.get('https://reqres.in/api/users');
    //Get Method
    const response= await request.put('https://reqres.in/api/users/2', {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'free_user_3DKEPYSm43L3yEnPAcpu09JQDjX',
        },
        data: {
            first_name: 'Melissa',
            last_name: 'Lara',
        }
    });
    
    console.log('Status:', response.status());

    const body = await response.json();
    console.log(body);

    expect(response.status()).toBe(200);
    expect(body.first_name).toBe('Melissa');
    expect(body.last_name).toBe('Lara');
    expect(response.ok()).toBeTruthy();
    expect(body).toHaveProperty('updatedAt');
       
});


//How to run a DELETE API Request
test('DELETE API Request', async ({ request }) => {

    //const response= await request.get('https://reqres.in/api/users');
    //Get Method
    const response= await request.delete('https://reqres.in/api/users/2', {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'free_user_3DKEPYSm43L3yEnPAcpu09JQDjX',
        },
        data: {
            first_name: 'Melissa',
            last_name: 'Lara',
        }
    });
    
    console.log('Status:', response.status());

    expect(response.status()).toBe(204);
    expect(await response.text()).toBe('');
    expect(response.ok()).toBeTruthy();
       
});
