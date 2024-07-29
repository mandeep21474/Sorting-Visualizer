// under process element
let situation=false;
let loader=document.getElementById("preloader");
window.addEventListener("load",()=>{
    loader.style.display="none";
})


// when page reloaded the speaker will stop speaking
window.addEventListener('beforeunload', () => { 
    speechSynthesis.cancel(); // Stops any ongoing speech
});


let voices = [];
let utterance;
function populateVoices() {
    voices = speechSynthesis.getVoices();
}

function speak(algo) {
    let text;
    if(algo==="bubble"){
        text="Bubble Sort\n\nThe best case time complexity is n while the average and worst case time complexities are n square where n is the length of given array. The space complexity is constant";
    }
    else if(algo==="Merge"){
        text="Merge Sort\n\nThe best, average and worst case time complexities are n*log(n) and the space complexity is n, where n is the length of given array.";
 
    }
    else if(algo==="Quick"){
        text="Quick Sort\n\nBest and average time complexity is (n*log(n)), worst is n square. Space complexity is log n on average and n in the worst case, where n is the array length.";
 
    }
    else if(algo==="Heap"){
        text="Heap Sort\n\nThe best, average and worst case time complexities are n*log(n), where n is the length of given array. The space complexity is constant";

    }
    else if(algo==="Selection"){
        text="Selection Sort\n\nThe best, average and worst case time complexities are n square, where n is the length of given array. The space complexity is constant";

    }
    else if(algo==="Insertion"){
        text="Insertion Sort\n\nThe best case time complexity is n while the average and worst case time complexities are n square, where n is the length of given array. The space complexity is constant";


    }
   
    utterance = new SpeechSynthesisUtterance(text);

    // Ensure voices are loaded before trying to select one
    if (voices.length === 0) {
        populateVoices();
    }

    // Select the Google UK English Male voice
    let selectedVoice=-1;
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === 'Google UK English Male') {
            selectedVoice = voices[i];
            break;
        }
    }
    if(selectedVoice===-1){
        selectedVoice=voices[0];
    }

    if (selectedVoice) {
        utterance.voice = selectedVoice;
        speechSynthesis.speak(utterance);
        return true;
    } else {
        console.error('Google UK English Male voice not found.');
    }
}

// Populate voices when they are loaded
speechSynthesis.onvoiceschanged = populateVoices;
populateVoices(); // Initial population in case voices are already available






const canvas = document.getElementById('sortCanvas');
const ctx = canvas.getContext('2d');
let array = [];
let size=50;
let delay = 200; // Default delay
let sorting = false;

function updatesize(value){
    if(situation==true){
        return ;
    }
    size=value;
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * canvas.height));
    }
    drawArray(array);
   
   

}

async function resetArray() {
    if(situation==true){
        return ;
    }
    let chosen=document.querySelector("button");
    chosen.style.color="red";
    await sleep(150);
    chosen.style.color="white";
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * canvas.height));
    }
    drawArray(array);
   

}

function drawArray(arr, comparing1 = -1, comparing2 = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arr.length; i++) {
        if (i === comparing1 || i === comparing2) {
            ctx.fillStyle = 'red'; // Comparing elements
        }
        else if(comparing2===Infinity&&comparing1===i){
            ctx.fillStyle = 'red';
        } 
        else {
            ctx.fillStyle = '#007bff'; // Default color
        }
        ctx.fillRect(i * (canvas.width / arr.length), canvas.height - arr[i], (canvas.width / arr.length) - 1, arr[i]);
    }
}

function drawArrayAfterCompletion(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = '#007bff'; // Default color
        ctx.fillRect(i * (canvas.width / arr.length), canvas.height - arr[i], (canvas.width / arr.length) - 1, arr[i]);
    }
}
async function bubbleSort() {
    situation=true;
    sorting = true;
    let slider=document.querySelector(".size_array");
    slider.disabled = true;
    let nodes=document.querySelectorAll("button");
    let chosen=nodes[1];
    speak("bubble");

    chosen.style.color="red";
    await sleep(150);
    
    chosen.style.color="white";
    chosen.style.borderStyle="solid";
    chosen.style.borderColor="red";
    utterance.onend=async ()=>{
    let alreadysorted=true;
    for (let i = 0; i < array.length-1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          
            if (array[j] > array[j + 1]) {
                drawArray(array, j, j + 1);
                await sleep(delay);
                alreadysorted=false;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                
            }
        }
        if(alreadysorted==true){
            break;
        }
    }
    drawArrayAfterCompletion(array);

  
    sorting = false;
    situation=false;
    slider.disabled = false;
 
    chosen.style.border="none";
};
    
}

async function mergeSort(arr = array, l = 0, r = arr.length - 1) {
    
    if (l >= r) {
        return;
    }
    let m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
    if (l === 0 && r === arr.length - 1) {
        drawArrayAfterCompletion(array);
        situation=false;
        sorting = false;
        let slider=document.querySelector(".size_array");
        slider.disabled = false;
        let nodes=document.querySelectorAll("button");
        let chosen=nodes[2];
        chosen.style.border="none";;
        
     
    }

}

async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        drawArray(arr, l + i, m + 1 + j);
        await sleep(delay);
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;

    }

    while (i < n1) {
        arr[k] = L[i];
        drawArray(arr, l + i, -1); 
        await sleep(delay);
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        drawArray(arr, -1, m + 1 + j);
        await sleep(delay);
        j++;
        k++;
    }
}

async function heapSort() {
    situation=true;
    sorting = true;
    let slider=document.querySelector(".size_array");
    slider.disabled = true;
    speak("Heap");
    let nodes=document.querySelectorAll("button");
    let chosen=nodes[3];
    
 
    chosen.style.color="red";
    await sleep(delay);
    chosen.style.color="white";
    chosen.style.borderStyle="solid";
    chosen.style.borderColor="red";
    utterance.onend=async ()=>{

   

    let n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        drawArray(array,0,i);
        await sleep(delay);
        [array[0], array[i]] = [array[i], array[0]];
        await heapify(array, i, 0);
        drawArray(array);
        await sleep(delay);
    }
    drawArrayAfterCompletion(array);
  
    sorting = false;
    situation=false;
    slider.disabled=false;
    chosen.style.border="none";
};
}

async function heapify(arr, n, i) {
   
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        drawArray(arr); 
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await sleep(delay);
        await heapify(arr, n, largest);
    }

}

async function quickSort(arr = array, low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
    if (low === 0 && high === array.length - 1) {
        drawArrayAfterCompletion(array);
        situation=false;
        sorting = false;
         let slider=document.querySelector(".size_array");
    slider.disabled = false;
        let nodes=document.querySelectorAll("button");
        let chosen=nodes[4];
        chosen.style.border="none";
    }
}

async function partition(arr, low, high) {
   

    let pivot = arr[low];
    let c = 0; // count of smaller elements
    drawArray(arr, low, Infinity);
    await sleep(delay);

    for (let i = low + 1; i <= high; i++) {
        if (arr[i] <= pivot) {
            c++;
        }
    }

    let correctPos = low + c;
    [arr[low], arr[correctPos]] = [arr[correctPos], arr[low]];
    drawArray(arr, low + c, Infinity);
    await sleep(delay);

    let i = low;
    let j = high;

    while (i < correctPos && j > correctPos) {
        while (arr[i] <= pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }

        if (i < correctPos && j > correctPos) {
            drawArray(arr, low + c, Infinity);
            await sleep(delay);

            [arr[i], arr[j]] = [arr[j], arr[i]];
            drawArray(arr, low + c, Infinity);
            await sleep(delay);

            i++;
            j--;
        }
    }
    drawArray(arr, low + c, Infinity);
    await sleep(delay);

    return correctPos;
}

async function insertionSort() {
    situation=true;
    sorting = true;
    let nodes=document.querySelectorAll("button");
    let chosen=nodes[5];
 
    chosen.style.color="red";
    await sleep(150);
    chosen.style.color="white";
    chosen.style.borderStyle="solid";
    chosen.style.borderColor="red";

    let slider=document.querySelector(".size_array");
    slider.disabled = true;
    speak("Insertion");
    utterance.onend=async ()=>{
    for (let i = 0; i < array.length; i++) {
      
        let j = i;

        while (j >0 && array[j] < array[j-1]) {
            drawArray(array, j, j - 1);
            await sleep(delay);
            
            let temp=array[j-1];
            array[j-1]=array[j];
            array[j]=temp;
        
            j=j-1;
           
        }
       
    }
    drawArrayAfterCompletion(array);
    situation=false;
    sorting = false;
    slider.disabled=false;
    chosen.style.border="none";
};
}

async function selectionSort() {
    situation=true;
    sorting = true;
    let nodes=document.querySelectorAll("button");
    let chosen=nodes[6];
 
    chosen.style.color="red";
    await sleep(150);
    chosen.style.color="white";
    chosen.style.borderStyle="solid";
    chosen.style.borderColor="red";
    let slider=document.querySelector(".size_array");
    slider.disabled = true;
    speak("Selection");
    utterance.onend=async ()=>{
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            drawArray(array, i, j);
            await sleep(delay);
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        drawArray(array, i);
        await sleep(delay);
    }
    drawArrayAfterCompletion(array);
  
    situation=false;
    sorting = false;
    slider.disabled=false;
    chosen.style.border="none";
};
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateSpeed(value) {
    delay = 1000 - value; // Invert the value to make higher slider values faster
}

function startSort(type) {
    if (sorting) return; // Prevent starting a new sort while one is in progress

    switch (type) {
        case 'bubble':
            bubbleSort();
            break;
        case 'merge':
                        async function start(){  
                        let nodes=document.querySelectorAll("button");
                        let chosen=nodes[2];
                    
                        chosen.style.color="red";
                        await sleep(150);
                        chosen.style.color="white";
                        chosen.style.borderStyle="solid";
                        chosen.style.borderColor="red";
                        sorting=true;
                        let slider=document.querySelector(".size_array");
                        slider.disabled = true;
                        situation=true;
                            speak("Merge");
                            utterance.onend=async ()=>{
                            mergeSort();
                            };
                        };
                        start();    
                        break;
        case 'heap':
            heapSort();
            break;
        case 'quick':
                        async function startquick(){
                            let nodes=document.querySelectorAll("button");
                            let chosen=nodes[4];
                            chosen.style.color="red";
                            await sleep(150);
                            chosen.style.color="white";
                            chosen.style.borderStyle="solid";
                            chosen.style.borderColor="red";
                            situation=true;
                            sorting = true;
                            let slider=document.querySelector(".size_array");
                            slider.disabled = true;
                            speak("Quick");
                            utterance.onend=async ()=>{
                            quickSort();
                            };
                        };
                        startquick(); 
                        break;
        case 'insertion':
            insertionSort();
            break;
        case 'selection':
           selectionSort();
            break;
        default:
            break;
    }
}

// Initialize array
resetArray();