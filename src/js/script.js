document.addEventListener("DOMContentLoaded", function () {
	const chart = document.querySelector(".statistics__chart");
	const reportBtn = document.querySelector(".report__btn");
	const links = document.querySelectorAll(".nav__link");
	const dashboard = document.querySelector(".dashboard");
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const notificationsData = [
		{
			message: "Welcome to your dashboard!",
			time: "1 hour ago",
			from: "System",
		},
		{
			message: "You have 2 new messages",
			time: "1 hour ago",
			from: "Nick J.",
		},
		{
			message: "Your report is ready to download",
			time: "2 hours ago",
			from: "System",
		},
		{
			message: "First steps in the Dashboard",
			time: "3 hours ago",
			from: "Jerry from Dashboard",
		},
		{
			message: "Update: Dashboard v2.1",
			time: "4 hours ago",
			from: "System",
		},
		{
			message: "New payment: +$1,200 PayPal",
			time: "4 hour ago",
			from: "System",
		},
		{
			message: "The transfer has been completed",
			time: "4 hours ago",
			from: "John D",
		},
		{
			message: "Reminder: Rebalance portfolio",
			time: "5 hours ago",
			from: "System",
		},
		{
			message: "New: Analytics in PRO!",
			time: "6 hour ago",
			from: "Daniel from Dashboard",
		},
		{
			message: "Contact details confirmation",
			time: "8 hour ago",
			from: "Support Team",
		},
	];
	const loadingTime = 4000;
	const CIRCLE_DASHARR = 314;
	const messagesPanel = document.querySelector(".notifications-box");
	const headerPanel = document.querySelector(".header__panel");
	const closeHeaderPanelBtn = document.querySelector(
		".notifications-box__close"
	);
	const tasks = document.querySelector(".tasks");
	const bellDot = document.querySelector(".dot");
	const notificationsBox = document.querySelector(".notifications-box");
	const notificationsBell = document.querySelector(".header__btn--bell");
	const headerBtns = [
		document.querySelector(".header__btn--search-engine"),
		document.querySelector(".header__pro-subscribtion-btn"),
	];
	const userPanel = document.querySelector(".user-panel");
	const searchInput = document.querySelector(".header__input");

	const loginPage = document.querySelector(".login-page");
	const loginInputs = document.querySelectorAll(".login-page__input");
	const passForgottenLink = document.querySelector(
		".login-page__pass-forgotten"
	);
	const loginBtn = document.querySelector(".login-page__login-btn");
	const errorrInfo = document.querySelector(".error-info");
	const usernameInput = document.querySelector(".login-page__input--username");
	const passwordInput = document.querySelector(".login-page__input--password");
	const loginData = document.querySelector(".login-data");
	const loadingBox = document.querySelector(".loading-box");

	const infoPopup = document.querySelector(".popup-settings");
	const popupUsername = document.querySelector(".popup-username__input");
	const popupSelect = document.querySelector(".popup-country__select");
	const popupBtn = document.querySelector(".popup-settings__btn");

	const loadLoginPage = () => {
		loginPage.classList.add("visible");
	};

	const handleNavLinks = (e) => {
		e.preventDefault();
		links.forEach((link) => link.classList.remove("active"));
		e.target.classList.add("active");
	};
	const handleHeaderPanel = (e) => {
		if (e.target.matches(".header__btn--bell")) {
			showMsgPanel();
		} else if (e.target.matches(".header__btn--search-engine")) {
			handleSearchInput();
		} else if (e.target.matches(".header__btn--user")) {
			showUserPanel();
		} else if (e.target.matches(".header__pro-subscribtion-btn")) {
			handleTasks(e.target);
		} else if (e.target.matches(".header__btn--tasks")) {
			showTasks();
		}
	};
	const showTasks = () => {
		tasks.classList.add("active");
	};
	const handleSearchInput = () => {
		searchInput.value = "";
		headerBtns.forEach((btn) => btn.classList.toggle("btn-moved"));
		searchInput.classList.toggle("active");
	};
	const hideSearcher = () => {
		searchInput.value = "";
		headerBtns.forEach((btn) => btn.classList.remove("btn-moved"));
		searchInput.classList.remove("active");
	};
	const showMsgPanel = () => {
		messagesPanel.classList.add("active");
		bellDot.classList.remove("visible");
	};
	const hidePanel = (panel) => {
		panel.classList.add("hidden");
		panel.classList.remove("active");

		setTimeout(() => {
			panel.classList.remove("hidden");
		}, 300);
	};
	const showUserPanel = () => {
		userPanel.classList.add("active");
	};

	// POPUP

	const COUNTRIES_DATA = "../countries.json";

	const downloadCoutries = () => {
		fetch(COUNTRIES_DATA).then((res) =>
			res.json().then((data) => {
				for (country of data) {
					const option = document.createElement("option");
					option.value = country.name;
					option.innerText = country.name;

					popupSelect.append(option);
				}
			})
		);
	};

	const showPopup = () => {
		const obj = getUserData();

		if (obj.popupSeen) return;

		setTimeout(() => {
			infoPopup.classList.add("active");

			const popupBtn = document.querySelector(".popup-settings__btn");
			downloadCoutries();

			if (!popupBtn) return;

			popupBtn.addEventListener("click", savePopupData);
		}, 4000);
	};
	const savePopupData = () => {
		checkPopup();
	};
	const checkPopup = () => {
		const popupUsername = document.querySelector(".popup-username__input");
		const popupSelect = document.querySelector(".popup-country__select");
		const errorTxt = infoPopup.querySelector(".error-txt");
		const selectedValue = popupSelect.options[popupSelect.selectedIndex].value;
		if (!popupUsername.value.trim() || selectedValue == 0) {
			errorTxt.textContent = "Complete all fields";
			errorTxt.classList.add("error");
		} else {
			errorTxt.classList.remove("error");
			errorTxt.textContent = "";

			checkErrors(errorTxt, popupUsername, selectedValue);
		}
	};
	const checkErrors = (errorTxt, username, selectedValue) => {
		if (errorTxt.classList.contains("error")) return;

		updateUserData({
			username: username.value,
			location: selectedValue,
			popupSeen: true,
		});
		setUserInfo();

		infoPopup.classList.remove("active");
	};

	// POPUP END

	// START of TASKS MANAGER

	function handleTasks(el) {
		const elementData = el.dataset.name;
		const currentTask = tasks.querySelector(`[data-name="${elementData}"]`);

		setProgressBarWidth(currentTask);
	}

	const setProgressBarWidth = (currTask) => {
		const dividend = 100;
		const tasksTarget = currTask.querySelector(".tasks__target");
		const tasksNum = parseInt(tasksTarget.textContent.slice(4));
		const progressBar = currTask.querySelector(".tasks__progress-bar");

		handleTaksState(currTask, tasksTarget, tasksNum);

		let taskProgressNum = parseInt(currTask.dataset.number);
		progressBar.style.width = (dividend / tasksNum) * taskProgressNum + "%";
	};
	const handleTaksState = (currTask, tasksTarget, tasksNum) => {
		let taskProgressNum = parseInt(currTask.dataset.number);

		if (taskProgressNum >= tasksNum) return;

		taskProgressNum = updateTaskNumber(currTask);

		const tasksStatus = currTask.querySelector(".tasks__status");
		tasksTarget.textContent = `${taskProgressNum} / ${tasksNum}`;
		hideTarget(tasksTarget);
		showIfChecked(tasksStatus);
	};
	const hideTarget = (tasksTarget) => {
		setTimeout(() => {
			tasksTarget.classList.add("hidden");
		}, 300);
	};
	const showIfChecked = (tasksStatus) => {
		const checkIcon = tasksStatus.querySelector("i");
		setTimeout(() => {
			checkIcon.classList.add("visible");
		}, 600);
	};
	const updateTaskNumber = (currTask) => {
		let num = currTask.dataset.number;
		num++;
		currTask.dataset.number = num;
		return num;
	};

	// END of TASKS MANAGER

	// FORM VALIDATION
	const USERNAME = "#j5e_dk1";
	const PASSWORD = "123g45Z6789!";

	const handleInputs = (e) => {
		e.preventDefault();
		checkIfEmpty();
		searchForErrors();
	};
	const checkIfEmpty = () => {
		loginInputs.forEach((input) => {
			if (!input.value.trim()) {
				errorrInfo.textContent = "Complete all fields";
				addError(input);
			} else {
				errorrInfo.textContent = "";
				removeError(input);
				checkInputs(input);
			}
		});
	};
	const checkInputs = (input) => {
		if (usernameInput.value !== USERNAME || passwordInput.value !== PASSWORD) {
			errorrInfo.textContent = "Wrong username or password";
			addError(input);
		} else {
			errorrInfo.textContent = "";
			removeError(input);
		}
	};

	const addError = (input) => {
		input.classList.add("error");
	};
	const removeError = (input) => {
		input.classList.remove("error");
	};
	let sending = false;
	const searchForErrors = () => {
		const hasError = Array.from(loginInputs).some((el) =>
			el.classList.contains("error")
		);
		if (sending) return;

		if (!hasError) {
			sending = true;
			loginUser();

			setTimeout(() => {
				sending = false;
			}, 1000);
		} else {
		}
	};

	// END OF FORM VALIDATION

	// LOGIN DATA
	let loggedIn;

	const loginUser = () => {
		loadingBox.classList.add("active");
		loginData.classList.remove("active");

		loggedIn = true;

		const userData = getUserData();

		if (userData === null) {
			createUserData();
		}
		updateUserData({ usernameBasic: usernameInput.value, loggedIn });

		setTimeout(() => {
			loadingBox.classList.remove("active");
			dashboard.classList.add("logged-in");
			loginPage.classList.remove("visible");

			clearChartAndProgressRing();
			handleRingStats();
			createColumns();
			setUserInfo();
			showPopup();

			usernameInput.value = "";
			passwordInput.value = "";
		}, loadingTime);
	};
	const handleLoginData = (e) => {
		e.preventDefault();
		loginData.classList.toggle("active");
	};

	const checkIfLoggedIn = () => {
		const userData = getUserData();

		if (!userData) return;

		const isLoggedIn = userData.loggedIn;

		if (isLoggedIn !== null && isLoggedIn) {
			dashboard.classList.add("logged-in");
			loadingBox.classList.remove("active");
			loginPage.classList.remove("visible");

			handleRingStats();
			createColumns();
			downloadUserInfo();
			showPopup();
		}
	};

	// END OF LOGIN DATA

	const handleUserPanel = (e) => {
		e.preventDefault();

		if (dashboard !== null) {
			if (e.target.matches(".user-panel__link")) {
				hidePanel(userPanel);

				if (e.target.matches(".user-panel__link--logout")) {
					logoutUser();
				}
			}
		}
	};

	// LOGOUT USER
	const logoutUser = () => {
		updateUserData({ loggedIn: false });

		loadingBox.classList.add("active");

		setTimeout(() => {
			dashboard.classList.remove("logged-in");
			loginPage.classList.add("visible");
			loadingBox.classList.remove("active");
		}, loadingTime);
	};
	const clearChartAndProgressRing = () => {
		const rings = [
			document.querySelector(".progress-ring__progress"),
			document.querySelector(".progress-ring__progress-bg"),
		];
		rings.forEach((ring) => {
			ring.style.strokeWidth = 0;
			ring.style.strokeDashoffset = CIRCLE_DASHARR;
		});
		chart.innerHTML = "";
	};

	const createNotifications = () => {
		const notificationsBody = document.querySelector(
			".notifications-box__body"
		);
		const arr = [];

		for (let i = 0; i < notificationsData.length; i++) {
			const num = Math.floor(Math.random() * notificationsData.length);
			if (num !== 0) {
				setTimeout(() => {
					bellDot.classList.add("visible");
				}, 300);
			} else {
				bellDot.classList.remove("visible");
			}
			if (arr.includes(num)) return;
			arr.push(num);
			const notification = document.createElement("div");
			notification.classList.add("notifications-box__notification");

			notification.innerHTML = `<div class="notifications-box__head">
                            <span class="notifications-box__header">${notificationsData[num].message}</span>
                            <span class="notifications-box__time">${notificationsData[num].time}</span>
                        </div>
                        <p class="notifications-box__author">${notificationsData[num].from}</p>`;

			notificationsBody.append(notification);
		}
	};

	const handleRingStats = () => {
		const rings = [
			document.querySelector(".progress-ring__progress"),
			document.querySelector(".progress-ring__progress-bg"),
		];
		const earnings = parseFloat(
			document
				.querySelector(".progress-ring tspan:first-of-type")
				.textContent.replace(",", ".")
				.slice(1, -1)
		);
		const destiny = parseFloat(
			document
				.querySelector(".progress-ring tspan:last-of-type")
				.textContent.replace(",", ".")
				.slice(3, -1)
		);
		const earningsPercentage = (earnings / destiny).toFixed(5);
		const finalOffset = Math.floor(CIRCLE_DASHARR * (1 - earningsPercentage));

		setTimeout(() => {
			rings.forEach((ring) => {
				ring.style.strokeDashoffset = finalOffset;
				ring.style.strokeWidth = 6;
			});
		}, 100);
	};
	const btnClickAnimation = (e) => {
		const circle = document.createElement("span");
		circle.classList.add("circle");

		const rect = e.target.getBoundingClientRect();

		const top = e.clientY - rect.top + "px";
		const left = e.clientX - rect.left + "px";

		circle.style.top = top;
		circle.style.left = left;

		e.target.append(circle);

		setTimeout(() => {
			circle.remove();
		}, 300);
	};

	const createColumns = () => {
		for (let i = 0; i < months.length; i++) {
			const box = document.createElement("div");
			const column = document.createElement("div");
			const monthName = document.createElement("span");
			const tooltip = document.createElement("div");

			box.classList.add("statistics__box");
			monthName.classList.add("statistics__month");
			column.classList.add("statistics__column");
			tooltip.classList.add("statistics__tooltip");

			const randomNumber = Math.floor(Math.random() * 80 + 20);
			tooltip.textContent = `Total revenue: $${randomNumber}00`;
			tooltip.style.opacity = 0;

			monthName.textContent = months[i];

			box.append(column);
			box.append(tooltip);

			setTimeout(() => {
				column.style.height = randomNumber + "px";
			}, 100);

			box.append(monthName);
			chart.append(box);

			handleTooltips(column, tooltip);
		}
		createNotifications();
	};

	const handleTooltips = (column, tooltip) => {
		column.addEventListener("mouseover", (e) => {
			const position = Math.floor(Math.random() * 20);
			tooltip.style.top = position - e.clientY / 10 + "px";
			tooltip.style.left = position - e.clientX / 10 + "px";
			tooltip.style.opacity = 1;
		});
		column.addEventListener("mouseleave", () => {
			tooltip.style.opacity = 0;
		});
	};

	const setUserInfo = () => {
		const aside = document.querySelector(".aside");
		const userName = aside.querySelector(".aside__user-name");
		const userLocation = aside.querySelector(".aside__user-location");
		const panelUserName = userPanel.querySelector(".id");

		const userData = getUserData();
		userName.textContent = userData.username || userData.usernameBasic;
		panelUserName.textContent = userData.username || userData.usernameBasic;

		if (!location) return;

		userLocation.textContent = userData.location;
	};
	const downloadUserInfo = () => {
		const userData = getUserData();

		if (!userData || !userData.username) return;

		const aside = document.querySelector(".aside");
		const userName = aside.querySelector(".aside__user-name");
		const panelUserName = userPanel.querySelector(".id");

		userName.textContent = userData.username;
		panelUserName.textContent = userData.username;

		if (!userData.location) return;

		const userLocation = aside.querySelector(".aside__user-location");
		userLocation.textContent = userData.location;
	};

	const createUserData = () => {
		const userData = {};
		localStorage.setItem("userData", JSON.stringify(userData));
	};
	const getUserData = () => {
		const data = localStorage.getItem("userData");
		return data ? JSON.parse(data) : null;
	};
	const updateUserData = (newData) => {
		const userData = getUserData();
		const updatedData = { ...userData, ...newData };
		localStorage.setItem("userData", JSON.stringify(updatedData));
		return updatedData;
	};

	loadLoginPage();
	checkIfLoggedIn();
	userPanel.addEventListener("click", handleUserPanel);
	window.addEventListener("click", (e) => {
		if (
			!notificationsBox.contains(e.target) &&
			e.target !== notificationsBell &&
			notificationsBox.classList.contains("active")
		) {
			hidePanel(messagesPanel);
		}
	});
	window.addEventListener("click", (e) => {
		if (e.target !== headerBtns[0] && e.target !== searchInput) {
			hideSearcher();
		}
	});
	window.addEventListener("click", (e) => {
		if (
			e.target !== tasks &&
			!tasks.contains(e.target) &&
			!e.target.matches(".header__btn--tasks") &&
			tasks.classList.contains("active")
		) {
			hidePanel(tasks);
		}
	});
	window.addEventListener("click", (e) => {
		if (
			!userPanel.contains(e.target) &&
			!e.target.matches(".header__btn--user") &&
			userPanel.classList.contains("active")
		) {
			hidePanel(userPanel);
		}
	});

	closeHeaderPanelBtn.addEventListener("click", () => {
		hidePanel(messagesPanel);
	});
	headerPanel.addEventListener("click", handleHeaderPanel);
	links.forEach((link) => link.addEventListener("click", handleNavLinks));
	reportBtn.addEventListener("click", btnClickAnimation);
	loginBtn.addEventListener("click", btnClickAnimation);
	loginBtn.addEventListener("click", handleInputs);
	passForgottenLink.addEventListener("click", handleLoginData);
});
