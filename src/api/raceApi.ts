const baseUrl = 'http://127.0.0.1:3000';
const engineUrl = `${baseUrl}/engine`;

export async function startEngine(id: number) {
  const response = await fetch(`${engineUrl}?id=${id}&status=started`, { method: 'PATCH' });
  return response.json() as Promise<StartEngine>;
}

export async function stopEngine(id: number) {
  const response = await fetch(`${engineUrl}?id=${id}&status=stopped`, { method: 'PATCH' });
  return response.json() as Promise<StartEngine>;
}

export async function drive(id: number) {
  const response = await fetch(`${engineUrl}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  if (response.status !== 200) {
    return { success: false };
  }
  return { ...(await response.json()) } as Promise<{ success: boolean }>;
}