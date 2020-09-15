<h1 align="center">
  <br>
  <img src="https://image.flaticon.com/icons/svg/880/880910.svg" alt="Sonic sensor" width="100">
  <br>
  <br>
  <span>Sonic sensor</span>
  <br>
  <img src="https://img.shields.io/npm/l/stegcloak?style=plastic" />
  <a href="https://www.npmjs.com/package/stegcloak"> <img src="https://img.shields.io/npm/v/stegcloak?style=plastic" /> </a>
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" />
  <br>
</h1>
<h4 align="center">Javascript module to send data in ultrasonic sound programatically and decoding the data through a realtime fast fourier transform (Data through audio in the web)
</h4>

## Proof Of Concept

<a href='https://res.cloudinary.com/dqmbs2chk/video/upload/v1598886336/demo_obb9eg.mp4'> Checkout the demo video</a>

Live demo 🚀 at https://sonic.surge.sh/proof/ - Keep your volume at full while trying

## Inspiration
In the challenging present times, many social-distancing aids have been created in order to enforce / assist in social distancing. Most of them are based on Bluetooth or Wi-Fi. However they have their own inherent problems due to the nature of the 
Most current social-distancing aids are: 
* **Inaccurate:** Most social-distancing apps use Bluetooth which is unreliable in detecting exact distances due to its wide range (around 10m). 
* **Not cross-platform:** They do not usually work on both iOS and Android. 
* **Lack of privacy:** They pose a risk to users’ privacy as they collect sensitive data. 
* **Passive:** They do not prevent, rather aim to mitigate.

## Our Magic Solution

Our app sends and listens for near-ultrasonic sound to reliably detect any phone in a 2-3m radius to alert the user. It uses the attenuation of the signal strength along with other mechanisms to detect people only in close proximity. Each device acts as a trigger by sending waves constantly which are only picked up by nearby devices, while also listening for waves it can pick up to alert its user.

## Application Demo

<div align="center" >
<a href="https://vimeo.com/450794816" target="_blank"><img src="https://img.youtube.com/vi/p4S_WvLqK7Y/3.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" /></a>
</div>

Live demo of app 🚀 at https://sonic.surge.sh/ - Keep your volume at full while trying

Nearing completion :)
