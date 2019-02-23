window.addEventListener("resize",changeOrderOfElements);
function changeOrderOfElements(){
    let wtParentElm = document.querySelector('.wt-change-order');
    let wtFirstChild = document.querySelector('.wt-change-order .wt-child-1');
    let wtSecondChild = document.querySelector('.wt-change-order .wt-child-2');
    let wtThirdChild = document.querySelector('.wt-change-order .wt-child-3');

    while(wtParentElm.firstChild){
        wtParentElm.removeChild(wtParentElm.firstChild);
    }

    if (wtWindowWidth < 768) {
        wtParentElm.appendChild(wtFirstChild);
        wtParentElm.appendChild(wtSecondChild);
        wtParentElm.appendChild(wtThirdChild);
    } else {
        wtParentElm.appendChild(wtThirdChild);
        wtParentElm.appendChild(wtSecondChild);
        wtParentElm.appendChild(wtFirstChild);
    }
}
