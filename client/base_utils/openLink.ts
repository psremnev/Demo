export function openLink(link, newTab = false) {
    window.open(link, newTab ? '_blank' : '_self');
}