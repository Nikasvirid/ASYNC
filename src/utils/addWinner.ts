import { getWinners, saveWinner } from '../api/carsApi';
import renderSorts from '../components/animationCars/sorts';
import renderWinnersTable from '../components/animationCars/winnersTable';
import { COUNT_WINNERS_PER_PAGE, VIEW_NAME } from '../constants';
import store from '../store';
import { enableBtn } from './utils';

const addWinner = async (carId: string, time: number) => {
    await saveWinner(carId, time);

    const { winners, allWinnersCount } = await getWinners(store.winnersCurrentPageNum);

    store.winners = winners;
    store.allWinnersCount = allWinnersCount;

    document.querySelector('#winners-title').innerHTML = `${VIEW_NAME.winners} (${store.allWinnersCount})`;

    document.querySelector('#winners').innerHTML = renderWinnersTable();

    if (Number(store.allWinnersCount) > store.winnersCurrentPageNum * COUNT_WINNERS_PER_PAGE) {
        enableBtn('#winners-pagination-next');
    }

    if (allWinnersCount !== '0') {
        document.querySelector('#sorts').innerHTML = renderSorts();
    }
};

export default addWinner;