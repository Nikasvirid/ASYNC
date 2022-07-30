const baseUrl = 'http://127.0.0.1:3000';
const winnersUrl = `${baseUrl}/winners`;

function getSort(sort?: string, order?: string): string {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
}

export async function getWinners(page: number, sort?: string, order?: string) {
  const limit = 10;
  const response = await fetch(`${winnersUrl}?_page=${page}&_limit=${limit}${getSort(sort, order)}`);
  const items = await response.json() as Array<Winner>;
  const rez: WinnerCars = {
    items: await Promise.all(items.map(async (winner: Winner) => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count') as string,
  };
  return rez;
}

export async function getWinner(id: number): Promise<Wins> {
  const response = await fetch(`${winnersUrl}/${id}`);
  return response.json() as Promise<Wins>;
}

export async function deletWinner(id: number): Promise<Wins> {
  const response = await fetch(`${winnersUrl}/${id}`, { method: 'DELETE' });
  return response.json() as Promise<Wins>;
}

export async function createWinner(item: Wins): Promise<Wins> {
  const response = await fetch(winnersUrl, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<Wins>;
}

export async function updateWinner(id: number, item: Wins): Promise<Wins> {
  const response = await fetch(`${winnersUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<Wins>;
}

async function getWinnerStatus(id: number) {
  const status = (await fetch(`${winnersUrl}/${id}`)).status;
  return status;
}

export async function saveWinner(id: number, time: number) {
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    const win: Wins = {
      id: id,
      wins: 1,
      time: time,
    };
    await createWinner(win);
  } else {
    const winner = await getWinner(id);
    const win: Wins = {
      id: id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    };
    await updateWinner(id, win);
  }
}