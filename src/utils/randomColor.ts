export default function randomColor() {
    let maxDarkValue = 0x3F3F3F; 
    let hex = Math.floor(Math.random() * maxDarkValue);
    let color = "#" + hex.toString(16).padStart(6, '0');
    return color;
}