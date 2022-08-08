const renderWinnersView = () => `
<div class='winners-view hide'>
  <div id='sorts'>${store.allWinnersCount === '0' ? '' : renderSorts()}</div>
  <h2 id='winners-title'>${VIEW_NAME.winners} (${store.allWinnersCount})</h2>
  <h3 id='winners-current-page-num'>Page#${store.winnersCurrentPageNum}</h3>
  <div id='winners'>
  ${store.allWinnersCount === '0' ? '<p>There are no winners yet</p>' : renderWinnersTable()}
  </div>
   ${renderWinnersPagination()}
</div>`;

export default renderWinnersView;