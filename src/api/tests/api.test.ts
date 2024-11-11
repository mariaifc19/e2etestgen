import { test, expect } from '@playwright/test';
import { ApiClient } from '../api-client';

const apiClient = new ApiClient();

test.describe('Api Tests', () => {

  test('POST /token request should return 200', async () => {
    const response = await apiClient.postToken()
    expect(response.status).toEqual(200);
    expect(response.data.data.access_token).not.toBeUndefined()
    expect(apiClient.isTokenValid(response.data.data)).toBeTruthy()
  });

  test('POST /orders request should return 200', async () => {
    const response = await apiClient.postToken()
    const body = {
      quantity: '6',
      package_id: 'merhaba-7days-1gb',
      description: 'sim merhaba-7days-1gb',
      type: 'sim'
    }

    const responsePostOrder = await apiClient.postOrder(response.data.data, body)
    expect(responsePostOrder.status).toEqual(200);
    const responseData = responsePostOrder.data.data
    expect(responseData.sims.length).toBe(6)
    expect(responseData.package_id).toBe('merhaba-7days-1gb')
    expect(responsePostOrder.data.data.esim_type).toBe('Prepaid')
    responseData.sims.forEach((sim: any) => {
      expect(sim.id).toBeTruthy()
  });
    
  });

  test('GET eSims list should return 200', async () => {
    const response = await apiClient.postToken()
    const body = {
      quantity: '6',
      package_id: 'merhaba-7days-1gb',
      description: 'sim merhaba-7days-1gb',
      type: 'sim'
    }

    const token = response.data.data

    await apiClient.postOrder(token, body)

    const responseGetList = await apiClient.getESims(token)   
    expect(responseGetList.status).toEqual(200);

    const responseData = responseGetList.data.data
    responseData.forEach((sim: any) => {
      expect(sim.id).toBeTruthy()
      expect(sim.is_roaming).toBeTruthy()
      expect(sim.iccid).toBeTruthy()
  });
  });

});






