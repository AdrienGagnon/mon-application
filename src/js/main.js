import { revealSection } from './script';

let currentPage = mainPage;
const allPages = document.querySelectorAll('.page');

const observer = new IntersectionObserver(entries => {
    if (FileSystemEntry.isIntersecting) {
        console.log('allo');
    }
});
