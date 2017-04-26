<template lang='html'>
      <transition name="dropDownBox" >
        <div class="modal-mask" :style="{'position':position,'left':left+'px','top':top+'px'}">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>
             <!--  <div class="modal-footer">
                <slot name="footer">
                  <button class="btn btn-primary" @click="$emit('close')">
                    确定
                  </button>
                </slot>
              </div> -->
            </div>
          </div>
        </div>
      </transition>
</template>
<script >
export default {
	// 下拉框
	name: 'dropDownBox',
	data() {
		return {
			position: 'fixed'
		}
	},
	props: ['left', 'top']
}
</script>

<style scoped>
	 /*
	  * The following styles are auto-applied to elements with
	  * transition="modal" when their visibility is toggled
	  * by Vue.js.
	  *
	  * You can easily play with the modal transition by editing
	  * these styles.
	  */

	 .modal-enter {
	   opacity: 0;
	 }

	 .modal-leave-active {
	   opacity: 0;
	 }

	 .modal-enter .modal-container,
	 .modal-leave-active .modal-container {
	   -webkit-transform: scale(1.1);
	   transform: scale(1.1);
	 }
</style>