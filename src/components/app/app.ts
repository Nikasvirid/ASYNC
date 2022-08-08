import renderHeader from '../animationCars/header';
import renderGarageView from '../pages/garage_page1';
import renderWinnersView from '../pages/champions_page2';

const renderApp = () => `
${renderHeader()}
${renderGarageView()}
${renderWinnersView()}`;

export default renderApp;