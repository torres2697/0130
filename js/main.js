const getCurrentDate = () =>
	new Date().getDate() +
	" " +
	new Date().toLocaleString("en", { month: "long" }) +
	" " +
	new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
	const btnSend = document.getElementById("reviews__form_btn");
	const inputText = document.getElementById("reviews__form_textarea");
	const reviewsWrapper = document.querySelector(".reviews__wrapper");

	let reviews = [];

	try {
		const savedReviews = localStorage.getItem("reviews");
		if (savedReviews.length) {
			const parsedReviews = JSON.parse(savedReviews);
			if (Array.isArray(parsedReviews)) {
				reviews = parsedReviews;
			}
		}
	} catch (error) {
		console.log(error);
	}

	const addReviewLayout = ({ text, date }) => {
		reviewsWrapper.innerHTML += `
      <div class="reviews__comment">
        <div class="reviews__comment_top">
            <div class="reviews__comment_name">
              Author
            </div>
            <div class="reviews__comment_date">
                ${date}
            </div>
        </div>
        <div class="reviews__comment_text">
          <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 9.5V10H1H7.5H8.70711L7.85355 9.14645L1.35355 2.64645L0.5 1.79289V3V9.5Z" fill="#F2FBFF" stroke="#C4CBCF"/>
          <mask id="path-2-inside-1_10657_26" fill="white">
          <path d="M1 9.5V10.5H8.5L7.5 9.5H1Z"/>
          </mask>
          <path d="M1 10.5H0V11.5H1V10.5ZM1 9.5V8.5H0V9.5H1ZM7.5 9.5L8.20711 8.79289L7.91421 8.5H7.5V9.5ZM8.5 10.5V11.5H10.9142L9.20711 9.79289L8.5 10.5ZM2 10.5V9.5H0V10.5H2ZM1 10.5H7.5V8.5H1V10.5ZM6.79289 10.2071L7.79289 11.2071L9.20711 9.79289L8.20711 8.79289L6.79289 10.2071ZM8.5 9.5H1V11.5H8.5V9.5Z" fill="#F2FBFF" mask="url(#path-2-inside-1_10657_26)"/>
          </svg>
          ${text}
        </div>
      </div>
    `;
	};

	if (reviews.length) {
		reviews.forEach((el) => addReviewLayout(el));
	}

	const validate = () => {
		if (inputText.value <= 0) {
			inputText.classList.add("error");
		} else {
			inputText.classList.remove("error");
			saveComment();
		}
	};

	const saveComment = () => {
		const newComment = { text: inputText.value, date: getCurrentDate() };
		reviews.push(newComment);
		localStorage.setItem("reviews", JSON.stringify(reviews));
		addReviewLayout(newComment);
		inputText.value = null;
	};

	btnSend.addEventListener("click", (e) => {
		e.preventDefault();
		validate();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Enter" && e.ctrlKey) {
			e.preventDefault();
			validate();
		}
	});
});
