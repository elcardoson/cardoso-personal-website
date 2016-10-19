    $(function(){
        $("#element").typed({
            strings: ["Tiago Cardoso", "Cardoso"],
             // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            // typing speed
            typeSpeed: 40,
            // time before typing starts
            startDelay: 0,
            // backspacing speed
            backSpeed: 1,
            // shuffle the strings
            shuffle: true,
            // time before backspacing
            backDelay: 500,
            // loop
            loop: false,
            // false = infinite
            loopCount: 2,
            // show cursor
            showCursor: false,
            // character for cursor
            cursorChar: "|",
            // attribute to type (null == text)
            attr: null,
            // either html or text
            contentType: 'html',
            // call when done callback function
            callback: function() {},
            // starting callback function before each string
            preStringTyped: function() {},
            //callback for every typed string
            onStringTyped: function() {},
            // callback for reset
            resetCallback: function() {}
        });
    });