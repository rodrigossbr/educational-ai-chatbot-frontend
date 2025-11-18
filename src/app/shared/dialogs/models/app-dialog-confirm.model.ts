export interface AppDialogConfirmModel {
  icon?: string;
  titulo?: string;
  subTitulo?: string;
  msg?: string;
  botaoCancelar?: string;
  botaoConfirmar?: string;
  botaoFechar?: boolean;
  desabilitarBotaoConfirmar?: boolean;
  inverterBotoes?: boolean;
  ocultarBotaoConfirmar?: boolean;
  ocultarBotaoCancelar?: boolean;
  msgErro?: string;
  semSubtitulo?: boolean;
}
