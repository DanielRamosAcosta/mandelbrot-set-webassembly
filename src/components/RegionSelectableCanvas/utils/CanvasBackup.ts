export class CanvasBackup {
  private originalCanvas: HTMLCanvasElement
  private originalCanvasCtx: CanvasRenderingContext2D 
  private backupCanvas: HTMLCanvasElement
  private backupCanvasCtx: CanvasRenderingContext2D 

  constructor(originalCanvas: HTMLCanvasElement) {
    this.originalCanvas = originalCanvas;
    this.originalCanvasCtx = originalCanvas.getContext('2d') as CanvasRenderingContext2D;
    
    this.backupCanvas = this.setupBackupCanvas();
    this.backupCanvasCtx = this.backupCanvas.getContext('2d') as CanvasRenderingContext2D;
  }

  setupBackupCanvas() {
    const backupCanvas = document.createElement('canvas');
    backupCanvas.width = this.originalCanvas.width;
    backupCanvas.height = this.originalCanvas.height;
    return backupCanvas;
  }

  save() {
    this.backupCanvasCtx.drawImage(this.originalCanvas, 0, 0);
  }

  restore() {
    this.originalCanvasCtx.drawImage(this.backupCanvas, 0, 0);
  }
}
