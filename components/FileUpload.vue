<template>
  <div class="file">
    <form enctype="multipart/form-data">
      <div class="form-group">
        <input type="file" name="photo">
      </div>
      <button type="button" class="btn btn-success">
        Submit
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'FileUpload'
}
</script>
