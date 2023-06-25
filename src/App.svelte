<script>
	import Router from "svelte-spa-router";
	import routes from "./routes";
</script>

<!-- This part is always displayed -->

<div class="navigation container">
	<nav class="navbar nav-fill w-100 navbar-expand-xl">
		<div class="container-fluid">
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="#/dokumentation"
							>Dokumentation</a
						>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/emotion">Emotion Scanner</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/hffiles"
							>File Classification</a
						>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/huggingface"
							>Hugging Face Classification</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</div>

<div class="container mt-3">
	<!-- Here we load the page depending on the current URL -->
	<Router {routes} />
</div>

<style>
	.navbar {
		background-color: #333333;
		color: #ffffff;
	}

	.navbar .nav-link {
		color: #ffffff;
	}

	.navbar-nav {
		width: 100%;
	}

	.navbar-nav li {
		flex: 1;
		text-align: center;
	}
</style>
