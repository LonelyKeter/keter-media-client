<template>
  <div class="star-rating">    
    <input type="radio" name="stars" id="star-a" value="10" 
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-a"></label>

    <input type="radio" name="stars" id="star-b" value="9"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-b"></label>

    <input type="radio" name="stars" id="star-c" value="8" 
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-c"></label>

    <input type="radio" name="stars" id="star-d" value="7"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-d"></label>

    <input type="radio" name="stars" id="star-e" value="6"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-e"></label>

    <input type="radio" name="stars" id="star-f" value="5"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-f"></label>

    <input type="radio" name="stars" id="star-g" value="4"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-g"></label>

    <input type="radio" name="stars" id="star-h" value="3"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-h"></label>

    <input type="radio" name="stars" id="star-i" value="2"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-i"></label>

    <input type="radio" name="stars" id="star-j" value="1"
      @click="$emit('ratingChanged', $event.target.value)"/>
    <label for="star-j"></label>
  </div>
</template>

<script>
export default {
  emits: ['ratingChanged']
};
</script>

<style>
.star-rating {
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
  justify-content: right;
  margin: 5px ;
  position: relative;
}
/* hide the inputs */
.star-rating input {
  display: none;
}
/* set properties of all labels */
.star-rating > label {
  width: 15px;
  height: 15px;
  font-family: Arial;
  font-size: 15px;
  transition: 0.2s ease;
  color: orange;
}
/* give label a hover state */
.star-rating label:hover {
  color: #ff69b4;
  transition: 0.2s ease;
  transform: scale(1.1);
}
.star-rating label:active::before {
  transform: scale(1.3);
}

/* set shape of unselected label */
.star-rating label::before {
  content: "\2606";
  position: absolute;
  top: 0px;
  line-height: 15px;
}
/* set full star shape for checked label and those that come after it */
.star-rating input:checked ~ label:before {
  content: "\2605";
}

.star-rating input:hover ~ label:before {
  content: "\2605";
}

@-moz-document url-prefix() {
  .star-rating input:checked ~ label:before {
    font-size: 20px;
    line-height: 21px;
  }
}
</style>