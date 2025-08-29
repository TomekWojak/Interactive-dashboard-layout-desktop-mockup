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
	const CIRCLE_DASHARR = 314;
	const handleNavLinks = (e) => {
		e.preventDefault();
		links.forEach((link) => link.classList.remove("active"));
		e.target.classList.add("active");
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
	};

	const handleTooltips = (column, tooltip) => {
		column.addEventListener("mouseover", (e) => {
			const position = Math.floor(Math.random() * 20)
			tooltip.style.top = position - e.clientY / 10 + "px";
			tooltip.style.left = position - e.clientX / 10+ "px";
			tooltip.style.opacity = 1;
		});
		column.addEventListener("mouseleave", () => {
			tooltip.style.opacity = 0;
		});
	};

	handleRingStats();
	createColumns();
	links.forEach((link) => link.addEventListener("click", handleNavLinks));
	reportBtn.addEventListener("click", btnClickAnimation);
});
