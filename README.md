# Accessible Residence Hall

A VR experience to educate prospective students about the accessibility amenities available at UF's Cypress Hall

## Getting Started

### Installation

Clone this Git repo and have [node installed](https://nodejs.org/en/). Install dependencies with

```bash
npm install
```

### Running

To get a local development server

```bash
npm start
```

And open http://localhost:3000/. 

You can also go to address that is printed out when running the app. It will look like the following line. This lets you test the app on your phone (if they are on the same Wi-Fi network)

```bash
[0004] info  Server running at http://XX.XX.XX.XX:3000/ (connect)
```

### Image Settings

The background images are resized to load faster. It uses a command line tool called [ImageMagick](https://www.imagemagick.org/script/index.php). To use, replace the "INPUT" and "OUTPUT" from the below command.

```bash
magick mogrify -path OUTPUT -filter Triangle -define filter:support=2 -thumbnail 4096x1024 -unsharp 1x2 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip INPUT
```

### Video Settings

Could not find a good CLI tool for compressing video, but using [HandBrake](https://handbrake.fr/) works well. Videos were compressed using the "Very Fast 480p30" preset with no audio.

## License

This project's code is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

This project's images, video, and other media is copyright of the University of Florida. Please contact them for usage.
