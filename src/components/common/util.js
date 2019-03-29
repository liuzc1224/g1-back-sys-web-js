export const showTitle = (item, vm) => {
  return vm.$config.useI18n ? vm.$t(item.name) : ((item.menuDescriptions && item.menuDescriptions.title) || item.name)
}
