const baseUrl = 'http://127.0.0.1:3000';
const garageUrl = `${baseUrl}/garage`;

export async function getCars(page: number) {
  const limit = 7;
  const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);
  const rez: GarageCars = {
    items: await response.json() as Car[],
    count: response.headers.get('X-Total-Count') as string,
  };
  return rez;
}

export async function getCar(id: number): Promise<Car> {
  const response = await fetch(`${garageUrl}/${id}`);
  return response.json() as Promise<Car>;
}

export async function createCar(item: RandomCars): Promise<Car> {
  const response = await fetch(garageUrl, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<Car>;
}

export async function deletCar(id: number): Promise<Car> {
  const response = await fetch(`${garageUrl}/${id}`, { method: 'DELETE' });
  return response.json() as Promise<Car>;
}

export async function updateCar(id: number, item: RandomCars): Promise<Car> {
  const response = await fetch(`${garageUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<Car>;
}