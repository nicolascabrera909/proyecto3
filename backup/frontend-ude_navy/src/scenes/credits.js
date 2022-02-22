class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
        console.log('Credits');

        var line;
        var wordIndex = 0;
        var lineIndex = 0;

        var wordDelay = 0;
        var lineDelay = 0;
        
    }


    preload(){
      
    }

    create () {

      this.line = [];
      this.wordIndex = 0;
      this.lineIndex = 0;

      this.wordDelay = 120;
      this.lineDelay = 400;
      this.content = [
        "The sky above the port was the color of television, tuned to a dead channel.",
        "`It's not like I'm using,' Case heard someone say, as he shouldered his way ",
        "through the crowd around the door of the Chat. `It's like my body's developed",
        "this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke.",
        "The Chatsubo was a bar for professional expatriates; you could drink there for",
        "a week and never hear two words in Japanese.",
        "",
        "Ratz was tending bar, his prosthetic arm jerking monotonously as he filled a tray",
        "of glasses with draft Kirin. He saw Case and smiled, his teeth a webwork of",
        "East European steel and brown decay. Case found a place at the bar, between the",
        "unlikely tan on one of Lonny Zone's whores and the crisp naval uniform of a tall",
        "African whose cheekbones were ridged with precise rows of tribal scars. `Wage was",
        "in here early, with two joeboys,' Ratz said, shoving a draft across the bar with",
        "his good hand. `Maybe some business with you, Case?'",
        "",
        "Case shrugged. The girl to his right giggled and nudged him.",
        "The bartender's smile widened. His ugliness was the stuff of legend. In an age of",
        "affordable beauty, there was something heraldic about his lack of it. The antique",
        "arm whined as he reached for another mug.",
        "",
        "",
        "From Neuromancer by William Gibson"
      ];
      



      this.add.text(40, 100, '', { fontSize: '10px', fill: '#fff' });
      this.nextLine();      
    }

    nextLine() {

        if (this.lineIndex === this.content.length)
        {
            //  We're finished
            return;
        }
    
        //  Split the current line on spaces, so one word per array element
        this.line = this.content[this.lineIndex].split(' ');
    
        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;
    
        //  Call the 'nextWord' function once for each word in the line (line.length)

        // 

          // ACA ES DONDE NO ESTA FUNCINOANDO, SEGUIR REVISANDO RODRIGO

        //
        this.sys.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord(), this);
    
        //  Advance to the next line
        this.lineIndex++;
    
    }
    
    nextWord() {
    
        //  Add the next word onto the text string, followed by a space
        text.text = text.text.concat(this.line[wordIndex] + " ");
    
        //  Advance the word index to the next word in the line
        this.wordIndex++;
    
        //  Last word?
        if (this.wordIndex === this.line.length)
        {
            //  Add a carriage return
            text.text = text.text.concat("\n");
    
            //  Get the next line after the lineDelay amount of ms has elapsed
            this.sys.game.time.events.add(this.lineDelay, this.nextLine(), this);
        }
    
    }
}

export default Credits;