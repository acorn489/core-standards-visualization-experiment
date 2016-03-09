export default function unwrapView() {
  this.$el = this.$el.children();
  this.$el.unwrap();
  this.setElement(this.$el);
}
