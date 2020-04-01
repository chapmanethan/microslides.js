# Microslides.js
_Dependency-free full page slides for the web_

A working demo can be found [here](https://ethanchap.com/microslides-demo/).

## Usage
Include these lines in your HTML:
```html
<link rel="stylesheet" href="path/to/microslides.min.css"/>
<script src="path/to/microslides.min.js"></script>
<script>msInit()</script>
```

Slides are defined using the `ms-slide` class, which must be wrapped by a `ms-slides` class. Buttons with the `data-control` attribute are used to control slide navigation.
```html
<div class="ms-slides">
	<div class="ms-slide">
		<h1>Slide 1</h1>
		<button data-control="next">Next</button>
	</div>
	<div class="ms-slide">
		<h1>Slide 2</h1>
		<button data-control="previous">Previous</button>
		<button data-control="next">Next</button>
	</div>
	<div class="ms-slide">
		<h1>Slide 3</h1>
		<button data-control="previous">Previous</button>
	</div>
</div>
```

This code is designed as a starting point. The codebase is small, so tweaks and customization can be done directly in the CSS or JS.

### Boilerplate

```html
<!doctype html>
<html>
	<head>
		<title>My Awesome Site</title>
		<link rel="stylesheet" href="path/to/microslides.min.css"/>
	</head>
	<body>
		<div class="ms-slides">
			<div class="ms-slide">
				<h1>Slide 1</h1>
				<button data-control="next">Next</button>
			</div>
			<div class="ms-slide" style="background: #aaa;">
				<h1>Slide 2</h1>
				<button data-control="previous">Previous</button>
				<button data-control="next">Next</button>
			</div>
			<div class="ms-slide" style="background: #1a1a1a; color: #fff;">
				<h1>Slide 3</h1>
				<button data-control="previous">Previous</button>
			</div>
		</div>
	<script src="path/to/microslides.min.js"></script>
	<script>msInit()</script>
	</body>
</html>
```

## Contributions
Any contributions are welcome.

## License
This project is licensed under the MIT license. See `LICENSE` for full text.
