# How to use
1. Import the style sheet:
   ```html
   <link rel="stylesheet" href="path/to/introduction-animation.css">
   ```
2. Import the animation Javascript code (preferably at the bottom of `<body>`):
   ```html
   <script src="path/to/introduction-animation.css">
   ```
3. Copy the following HTML structure into the place where you want the animation to show:
   ```html
   <div class="jibia-introduction-animation">
        <div class="input-box">
            <span id="input-text"></span>
            <span id="caret">|</span>
        </div>
        <div id="results-box" class="closed">
            <div id="products" class="result">
                <h1>Producten</h1>
                instant feedback
            </div>
            <div id="word-completion" class="result">
                <h1>Zoektermen</h1>
                <ul id="completion-list"></ul>
            </div>
            <div id="spelling-checker" class="result">
                <h1>Bedoelde u misschien?</h1>
                hogere convertie
            </div>
            <div id="promotions" class="result">
                <h1>Zoektermen</h1>
                acties
            </div>
            <div id="customizable" class="result">
                <section id="completion-section">
                    <h1>Zoektermen</h1>
                    <div class="completion-stub"></div>
                    <div class="completion-stub"></div>
                </section>
                <section id="products-section">
                    <h1>Producten</h1>
                    <div class="product-stub">
                        <div class="image-stub"></div>
                        <div class="line-stub"></div>

                    </div>
                    <div class="product-stub">
                        <div class="image-stub"></div>
                        <div class="line-stub"></div>
                    </div>
                </section>
            </div>
        </div>
    </div>
   ```
4. Profit.
