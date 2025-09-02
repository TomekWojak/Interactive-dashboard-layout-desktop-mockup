document.addEventListener("DOMContentLoaded", function () {
	const chart = document.querySelector(".statistics__chart");
	const reportBtn = document.querySelector(".report__btn");
	const links = document.querySelectorAll(".nav__link");
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
		}
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
		let taskProgressNum = parseInt(currTask.dataset.number)

		if (taskProgressNum >= tasksNum) return;

		taskProgressNum = updateTaskNumber(currTask);

		const tasksStatus = currTask.querySelector(".tasks__status");
		tasksTarget.textContent = `${taskProgressNum} / ${tasksNum}`;
	};

	const updateTaskNumber = (currTask) => {
		let num = currTask.dataset.number;
		num++;
		currTask.dataset.number = num;
		return num;
	};

	// END of TASKS MANAGER
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

	handleRingStats();
	createColumns();
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
});
