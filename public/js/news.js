function toggleContent(index) {
    const content = document.getElementById(`content${index}`);
    const truncated = content.querySelector('.content-truncated');
    const fullContent = content.querySelector('.full-content');
    const readMore = content.querySelector('.read-more');

    if (fullContent.style.display === 'none') {
        truncated.style.display = 'none';
        fullContent.style.display = 'block';
        readMore.innerText = 'Read less';
    } else {
        truncated.style.display = 'block';
        fullContent.style.display = 'none';
        readMore.innerText = 'Read more';
    }
}

function truncateContent(content) {
    const maxLength = 200;
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
}
