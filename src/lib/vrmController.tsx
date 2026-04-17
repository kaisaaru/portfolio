export let vrmInstance: any = null;

export function setVRM(vrm: any) {
  vrmInstance = vrm;
}

export function triggerExpression(name: string) {
  if (!vrmInstance) return;

  vrmInstance.expressionManager?.setValue(name, 1);

  setTimeout(() => {
    vrmInstance.expressionManager?.setValue(name, 0);
  }, 1500);
}