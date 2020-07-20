export const createModalRootNode = (): HTMLElement => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    const node = document.createElement('div');
    node.setAttribute('id', 'modal-root');
    document.body.appendChild(node);
    modalRoot = document.getElementById('modal-root');
  }
  return modalRoot;
};

export const isMobile = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  }
  return false;
};

export const downloadFile = (fileURL: string, defaultFileName?: string) => {
  const link = document.createElement('a');
  link.href = fileURL;
  link.download = defaultFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
