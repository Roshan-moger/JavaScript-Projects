(function() {
    const pictures = ["1", "2", "3", "4", "5"];
    
    const buttons = document.querySelectorAll(".btn");
    const imgDiv = document.querySelector('.image-container');
    
    let counter = 0;
    

    
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            if (button.classList.contains('btn-left')) {
                counter--;
                if (counter < 0) {
                    counter = pictures.length - 1;
                }
            }
            
            if (button.classList.contains('btn-right')) {
                counter++;
                if (counter >= pictures.length-1) {
                    counter = 0;
                }
            }

            
            
            imgDiv.style.backgroundImage = `url('IMG/${pictures[counter]}.jpeg')`;
        });
    });
})();
