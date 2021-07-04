<script lang='ts'>

// App.svelte

let title = 'Preprocess and Vite with Svelte'

let dX: number = 0;
let dY: number = 0;
let transformStyle: string;

const delta: number = 10;

$: {
	transformStyle = `transform: translateX(${dX}vw) translateY(${dY}vh)`
}

</script>

<template lang='pug'>
	include ./inc/dice-sprites.svg.pug
	include ./inc/icon-sprites-x64.svg.pug

	svelte:head
		title {title}

	head
		h1(title='Vaya Con Dios')
			a(href='https://github.com/SynCap/preporcess-and-vite-with-svelte')
				| {title}
				svg(preserveAspectRatio='xMidYMid meet')
					use(href='#gh-icon')
		p.
			#[a(href='https://svelte.dev') Svelte] template with
			#[a(href='https://github.com/sveltejs/svelte-preprocess') preprocess]
			under #[a(href='https://vitejs.dev') Vite] bundler
		p #[a(href='https://www.typescriptlang.org/') Typescript ] processor is tuned on to use #[a(href='https://esbuild.github.io/') ESbuild]
		p That is this template is ready to heavy projecting
		p Punch the green buttons to shift the dice

	.cinema
		.scene(style='{transformStyle}')
			.cube
				- for(let i=1;i<7;i++)
					div(class=`side-${i}`)
						svg
							use(href=`#c${i}`)

	.controls
		p
			button(on:click!='{()=> dY -= delta}' title='-Y') &#8679;
		p
			button.sup(on:click!='{()=> dX -= delta}' title='-X') &#8678;
			button(on:click!='{()=> dY += delta}' title='+Y') &#8681;
			button.sup(on:click!='{()=> dX += delta}' title='+X') &#8680;

</template>

<style lang='stylus'>
head
	display block
	color alpha(white, .7)
	text-shadow .1em .1em .1em alpha(black, .5)
	// border-bottom .15px dashed
	max-width 37rem
	margin 2rem auto
	padding 1rem

	h1
		color inherit

		svg
			width 1em
			height @width
			fill alpha(white, .7)
			display inline-block

	h1,p
		margin .5em 0

		a
			text-decoration none
			border-bottom 2px dashed alpha(#ccc, .3)
			font-weight bold
			color inherit

			&:hover
				border-bottom-color alpha(#eee, .7)

.controls
	position fixed
	bottom 2rem
	width 100%

	p
		margin 1rem
		display flex
		justify-content center
		gap 1rem

	button
		color white
		background-color alpha(lime, .5)
		padding 1rem
		border none
		border-radius .5em
		font-weight 900
		font-size 2rem
		min-width 5rem
		box-shadow 0 1rem .5rem .5rem alpha(#000, .2)
		cursor pointer
		transition all .4s

		&.sup
			transform translateY(-50%)

		&:hover
			box-shadow 0 1rem .5rem alpha(#000, .5)
			background-color alpha(lime, .9)

$baseSize = 300px
$halfSize = ($baseSize / 2)
$sideBG = radial-gradient(circle at top left, rgba(210, 10, 10, 0.5), rgba(110, 10, 10, 0.5))

.cinema
	background-color #222
	font-family sans-serif
	font-size 20px
	height 100vh
	width 100%
	display flex
	overflow hidden
	z-index -1
	position fixed
	top 0


.scene
	display flex
	margin auto
	justify-content center
	align-items center
	height $baseSize
	width $baseSize
	perspective 3 * $baseSize
	perspective-origin calc(50% + var(--dX)px) calc(300px + var(--dY)px)
	transition .4s transform linear

.cube
	height $baseSize
	width @height
	position relative
	transform-style preserve-3d
	transform rotateY(-30deg) rotateZ(20deg) rotateX(-30deg)
	animation rotate 10s linear infinite

	& > *
		background-image $sideBG
		border 3px solid maroon
		height $baseSize
		width @height
		position absolute
		border-radius 15%
		color rgba(255, 255, 255, 0.7)
		font-weight 900
		padding 0
		font-size $baseSize
		line-height $baseSize
		text-align center

	.side
		&-1
			transform translateZ(0 - $halfSize) rotateX(180deg)
		&-2
			transform translateZ($halfSize)
		&-3
			transform translateX(0 - $halfSize) rotateY(270deg)
		&-4
			transform translateX($halfSize) rotateY(90deg)
		&-5
			transform translateY($halfSize) rotateX(270deg)
		&-6
			transform translateY(0 - $halfSize) rotateX(90deg)

	svg
		fill alpha(white, .7)
		height 100%
		width @height

@keyframes rotate
	0%
		transform rotateX(0deg) rotateY(-210deg) rotateZ(60deg)
	50%
		transform rotateX(180deg) rotateY(210deg) rotateZ(-90deg)
	100%
		transform rotateX(720deg) rotateY(-210deg) rotateZ(60deg)

/**********************************************************/

:global(#root)
	position relative

:global(*)
	margin 0
	padding 0
	box-sizing border-box

:global(input)
	font inherit

:global(body)
	font 14pt/1 sans-serif

</style>
