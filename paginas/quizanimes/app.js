
//pegando meus atributos do html cm o query selectorr

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}


exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}


//caso clique no botao de continuar
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}

//configurando e criando minhas variaveis
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");



//caso o user clique no botao de recomeçar o quiiiz
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult");
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Tempo"; 
    next_btn.classList.remove("show"); 
}

//caso o usuario clique no botao de sair...
quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


//configurando o botao que leva a prox questao
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++;
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); // chamando a função startTimer 
        startTimerLine(widthValue); //chamando a startTimerLine função
        timeText.textContent = "Tempo:"; //mudando o texto to timetext
        next_btn.classList.remove("show"); //escondendo o nex_button
    }else{
        clearInterval(counter); //zerando o tempo
        clearInterval(counterLine); //zerando a countline
        showResult(); //chamando a funçao que mostra o resultado
    }
}


//funçao que pega as questoes e opçoes
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    //criando divs e spans e as atribuindo ao indexx
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adicionando mais uma span ao que_tag
    option_list.innerHTML = option_tag; //adicionando uma nova div ao option_tag
    
    const option = option_list.querySelectorAll(".option");
    // a partir do botão clicável, isso irá mostrar os resultados
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


// criando novas tags para os icones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';



//caso o usuario clique.. 
function optionSelected(answer){
    clearInterval(counter); //zerando o tempo
    clearInterval(counterLine); //zerando o counterLine
    let userAns = answer.textContent; //pegando as novas opçoes que o usuario selecionar
    let correcAns = questions[que_count].answer; //pegando as respostas
    const allOptions = option_list.children.length; //pegando as opçoes de respostaaaas
    
    if(userAns == correcAns){ // se o usuario quiser ver sua pontuaçao
        userScore += 1; //atualizando a pontuaçao do usuario
        answer.classList.add("correct"); //adiconando uma cor verdinha nas opçoes certass
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adicionando o simbolo de errado ou certo as opçoes
        console.log("Resposta correta");
        console.log("Suas respostas corretas = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adicionando a cor vermelhinha as opçoes erradas
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adicionando um crossicons as opcoes
        console.log("Resposta errada");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Seleção automática da opção correta");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //se o usuario clicar em alguma opçao, nao havera como mudar mais
    }
    next_btn.classList.add("show"); //mostrar o botao "next" caso o usuario clique em alguma opçao
}



function showResult(){
    info_box.classList.remove("activeInfo"); //ocultar a info box

    quiz_box.classList.remove("activeQuiz"); //ocultar a quiz box

    result_box.classList.add("activeResult"); //mostrar a result box

    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // se a pontuçao do usuario for maior que 3
        //criando tags para mostrar ao bendit usuario qual a sua pontuaçao
        let scoreTag = '<span> Parabéns! Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 1){ // se a pontuçao do usuario for maior que 1
        let scoreTag = '<span> Bom! Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // se a pontuçao do usuario for 0
        let scoreTag = '<span> Oops! Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}




function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Acabou o tempo!"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Acabou o tempo: seleção da resposta correta");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}



function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}



function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> Questões.</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}