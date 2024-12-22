<script>
export default {
    name: "BottomNavigationComponent",
    props: {
      total: {
        type: Number,
        default: null,
      },
      limit: {
        type: Number,
        default: null,
      },
      currentPage: {
        type: Number,
        default: null,
      },
    },
    emits: [
      'setLimit',
      'nextPage',
      'prevPage',
      'firstPage',
      'lastPage',
    ],
    data() {
      return {
        limits: [5, 15, 25, 50, 100],
      };
    },
    methods: {
      setLimit(value) {
        this.$emit('setLimit', value);
      },
      getTotalPages() {
        return Math.ceil(this.total / this.limit);
      },
      nextPage() {
        this.$emit('nextPage');
      },
      prevPage() {
        this.$emit('prevPage');
      },
      firstPage() {
        this.$emit('firstPage');
      },
      lastPage() {
        this.$emit('lastPage');
      },
      isPrevDisabled() {
        return this.currentPage === 1
      },
      isNextDisabled() {
        return this.getTotalPages() === 0 || this.currentPage === this.getTotalPages();
      }
    },
}
</script>

<template>
  <div class="admin-navigation">
    <ul class="admin-navigation__show-list">
      <li class="admin-navigation__show-item">
        <h4 class="admin-navigation__show-title">
          Всего записей:<span> {{ total }}</span>
        </h4>
      </li>
      <li class="admin-navigation__show-item">
        <h4 class="admin-navigation__show-title">Показывать по:</h4>
        <div class="admin-navigation__limit">
          <button
            v-for="value in limits"
            :key="value"
            class="admin-navigation__limit-btn"
            :class="{ active: value === limit }"
            @click="setLimit(value)"
          >
            {{ value }}
          </button>
        </div>
      </li>
    </ul>
    <div class="admin-navigation__paginator">
      <button
        class="to-left admin-navigation__paginator-btn"
        :class="{ disabled: isPrevDisabled() }"
        @click="firstPage()"
      />
      <button
        class="prev admin-navigation__paginator-btn"
        :class="{ disabled: isPrevDisabled() }"
        @click="prevPage()"
      >
        Назад
      </button>
      <p class="admin-navigation__paginator-counter">
        {{ currentPage }} из {{ getTotalPages() }}
      </p>
      <button
        class="next admin-navigation__paginator-btn"
        :class="{ disabled: isNextDisabled() }"
        @click="nextPage()"
      >
        Вперёд
      </button>
      <button
        class="to-right admin-navigation__paginator-btn"
        :class="{ disabled: isNextDisabled() }"
        @click="lastPage()"
      />
    </div>
  </div>
</template>

<style scoped></style>
