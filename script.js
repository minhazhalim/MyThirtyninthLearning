class TypeWriter {
     constructor(textElement,words,wait = 3000){
          this.textElement = textElement;
          this.words = words;
          this.text = '';
          this.wordIndex = 0;
          this.wait = parseInt(wait,10);
          this.type();
          this.isDeleting = false;
     }
     type(){
          const current = this.wordIndex % this.words.length;
          const fullText = this.words[current];
          if(this.isDeleting){
               this.text = fullText.substring(0,this.text.length - 1);
          }else{
               this.text = fullText.substring(0,this.text.length + 1);
          }
          this.textElement.innerHTML = `<span class="text">${this.text}</span>`;
          let typeSpeed = 300;
          if(this.isDeleting){
               typeSpeed /= 2;
          }
          if(!this.isDeleting && this.text === fullText){
               typeSpeed = this.wait;
               this.isDeleting = true;
          }else if(this.isDeleting && this.text === ''){
               this.isDeleting = false;
               this.wordIndex++;
               typeSpeed = 500;
          }
          setTimeout(() => {
               this.type();
          },typeSpeed);
     }
}
document.addEventListener('DOMContentLoaded',init);
function init(){
     const textElement = document.querySelector('.text-type');
     const words = JSON.parse(textElement.getAttribute('data-words'));
     const wait = textElement.getAttribute('data-wait');
     new TypeWriter(textElement,words,wait);
}