let url='https://superheroapi.com/api/4895369843807603/'

function getSuperhero(){
    axios.get(url).then((response) => {
        setSuperhero(response.data);    
      });
}
