


export const currentScroll = (ref) => {
    const container = ref.current;
    let isDown = false;
    let startX;
    let scrollLeft;
    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const handleMouseLeave = () => {
      isDown = false;
    };
    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 0.9;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
}



