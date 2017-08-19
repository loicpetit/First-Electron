export interface IModal<T> {
    open(onClose: (data: T) => void, onDismiss: () => void): void;
}

export * from './taches-create/modal';