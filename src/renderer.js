class App {
  constructor() {
    this.data = null;
    this.physicalCoresElement = document.querySelector('#physical-cores');
    this.logicalCoresElement = document.querySelector('#logical-cores');
    this.maxFrequencyElement = document.querySelector('#max-freq');
    this.minFrequencyElement = document.querySelector('#min-freq');
    this.totalUsageElement = document.querySelector('#total-usage');
    this.perCpuRow = document.querySelector('.per-cpu-stats').querySelector('.row');
    this.cpuCards = {};
    this.renderData();
    setInterval(() => {
      this.reRenderData();
    }, 100);
  }

  static renderCpuCard(cpuIndex, cpuLoad) {
    const html = `
    <div class="card shadow cpu-${cpuIndex}">
      <div class="card-body">
        <h5 class="card-title">Core №${cpuIndex}:</h5>
        <p class="stats">${cpuLoad}%</p>
      </div>
    </div>
    `;
    return html;
  }

  renderCommonStats() {
    this.physicalCoresElement.textContent = this.data.physical;
    this.logicalCoresElement.textContent = this.data.logical;
    this.maxFrequencyElement.textContent = `${this.data.maxfreq} Mhq`;
    this.minFrequencyElement.textContent = `${this.data.minfreq} Mhq`;
    this.totalUsageElement.textContent = `${this.data.total} %`;
  }

  async renderData() {
    await this.getData();
    this.renderCommonStats();
    this.perCpuRow.innerHTML = '';
    this.data.percpu.forEach((cpuLoad, cpuIndex) => {
      const html = App.renderCpuCard(cpuIndex + 1, cpuLoad);
      const cpuCard = document.createElement('div');
      cpuCard.classList.add('col-6', 'per-cpu-col');
      cpuCard.innerHTML = html;
      this.perCpuRow.appendChild(cpuCard);
      this.cpuCards[cpuIndex + 1] = cpuCard;
    });
  }

  async reRenderData() {
    await this.getData();
    this.renderCommonStats();
    this.data.percpu.forEach((cpuLoad, cpuIndex) => {
      this.cpuCards[cpuIndex + 1].querySelector('.card-title').textContent = `Core №${cpuIndex}`;
      this.cpuCards[cpuIndex + 1].querySelector('.stats').textContent = `${cpuLoad}%`;
    });
  }

  async getData() {
    this.data = await window.getData();
  }
}

// eslint-disable-next-line no-unused-vars
const stats = new App();
