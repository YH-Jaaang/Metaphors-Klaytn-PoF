sortByName = async (sortArr) => {
    sortArr.sort((a,b)=>{
        return(a.name < b.name) ? -1 :(a.name > b.name) ? 1 :0;
    })
};

sortByPrice = async (sortArr) => {
    sortArr.sort((a,b)=>{
        return(a.price > b.price) ? -1 :(a.price < b.price) ? 1 :0;
    })
};

const sort = {
    sortByName: sortByName,
    sortByPrice: sortByPrice
};

module.exports = sort;