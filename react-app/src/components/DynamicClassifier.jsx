import React, { useState, useEffect } from 'react';
import './DynamicClassifier.css';

/**
 * Component cho phân loại tài nguyên động
 * Cho phép tùy chỉnh tiêu chí phân loại và xem kết quả realtime
 */
function DynamicClassifier({ resources }) {
  const [filterCriteria, setFilterCriteria] = useState({
    environment: 'all',
    cpuThreshold: 2,
    memoryThreshold: 4,
    serviceType: 'all',
    priorityScore: 'balanced'
  });

  const [filteredResources, setFilteredResources] = useState(resources);
  const [stats, setStats] = useState({});

  // Cập nhật khi filter thay đổi
  useEffect(() => {
    applyDynamicFilters();
  }, [filterCriteria, resources]);

  /**
   * Áp dụng các filter động
   */
  const applyDynamicFilters = () => {
    let filtered = resources.filter(resource => {
      // Filter Environment
      if (filterCriteria.environment !== 'all') {
        const env = resource.tags?.env || '';
        if (env !== filterCriteria.environment) return false;
      }

      // Filter CPU
      if (resource.cpu < filterCriteria.cpuThreshold) return false;

      // Filter Memory
      if (resource.mem < filterCriteria.memoryThreshold) return false;

      // Filter Service Type
      if (filterCriteria.serviceType !== 'all') {
        const hasServiceType = resource.tags && Object.values(resource.tags).some(tag =>
          tag.toLowerCase().includes(filterCriteria.serviceType)
        );
        if (!hasServiceType) return false;
      }

      return true;
    });

    // Sắp xếp theo priority score
    filtered = sortByPriority(filtered);

    setFilteredResources(filtered);
    calculateStats(filtered);
  };

  /**
   * Sắp xếp theo điểm ưu tiên
   */
  const sortByPriority = (resources) => {
    return [...resources].sort((a, b) => {
      let scoreA = 0, scoreB = 0;

      // CPU score
      scoreA += a.cpu * 10;
      scoreB += b.cpu * 10;

      // Memory score
      scoreA += a.mem * 5;
      scoreB += b.mem * 5;

      // Environment priority
      const envPriority = { prod: 100, production: 100, staging: 50, test: 10 };
      const envA = a.tags?.env?.toLowerCase() || '';
      const envB = b.tags?.env?.toLowerCase() || '';
      scoreA += envPriority[envA] || 0;
      scoreB += envPriority[envB] || 0;

      // Balanced vs Aggressive
      if (filterCriteria.priorityScore === 'aggressive') {
        scoreA += (a.cpu + a.mem) * 20;
        scoreB += (b.cpu + b.mem) * 20;
      }

      return scoreB - scoreA;
    });
  };

  /**
   * Tính toán thống kê chi tiết
   */
  const calculateStats = (data) => {
    if (data.length === 0) {
      setStats({});
      return;
    }

    const totalCPU = data.reduce((sum, r) => sum + r.cpu, 0);
    const totalMem = data.reduce((sum, r) => sum + r.mem, 0);
    const avgCPU = (totalCPU / data.length).toFixed(2);
    const avgMem = (totalMem / data.length).toFixed(2);

    // Đếm theo environment
    const envCount = {};
    data.forEach(r => {
      const env = r.tags?.env || 'unknown';
      envCount[env] = (envCount[env] || 0) + 1;
    });

    // Đếm theo service type
    const serviceCount = {};
    data.forEach(r => {
      if (r.tags?.service) {
        serviceCount[r.tags.service] = (serviceCount[r.tags.service] || 0) + 1;
      }
    });

    // Tính priority index
    const priorityIndex = data.reduce((sum, r) => sum + (r.cpu * 10 + r.mem * 5), 0) / data.length;

    setStats({
      total: data.length,
      totalCPU,
      totalMem,
      avgCPU,
      avgMem,
      envCount,
      serviceCount,
      priorityIndex: priorityIndex.toFixed(2)
    });
  };

  /**
   * Reset filters
   */
  const resetFilters = () => {
    setFilterCriteria({
      environment: 'all',
      cpuThreshold: 2,
      memoryThreshold: 4,
      serviceType: 'all',
      priorityScore: 'balanced'
    });
  };

  /**
   * Export danh sách đã lọc
   */
  const exportFiltered = () => {
    const csv = [
      'ID,Name,CPU,Memory,Environment,Service,Classification',
      ...filteredResources.map(r =>
        `${r.id},"${r.name}",${r.cpu},${r.mem},"${r.tags?.env || ''}","${r.tags?.service || ''}","${r.classification || ''}"`
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `classified_resources_${new Date().getTime()}.csv`;
    a.click();
  };

  /**
   * Lấy màu priority
   */
  const getPriorityColor = (index) => {
    if (index > 80) return '#e74c3c'; // Red - Critical
    if (index > 60) return '#f39c12'; // Orange - High
    if (index > 40) return '#f1c40f'; // Yellow - Medium
    return '#27ae60'; // Green - Low
  };

  return (
    <div className="dynamic-classifier">
      <h2>⚙️ PHÂN LOẠI ĐỘNG TÀI NGUYÊN ĐÁM MÂY</h2>

      {/* === FILTER SECTION === */}
      <div className="filter-section">
        <h3>🔍 Tiêu Chí Lọc & Phân Loại</h3>

        <div className="filter-grid">
          {/* Environment Filter */}
          <div className="filter-group">
            <label>🌍 Môi Trường</label>
            <select
              value={filterCriteria.environment}
              onChange={(e) =>
                setFilterCriteria({ ...filterCriteria, environment: e.target.value })
              }
            >
              <option value="all">Tất Cả</option>
              <option value="prod">Production</option>
              <option value="staging">Staging</option>
              <option value="test">Testing</option>
              <option value="dev">Development</option>
            </select>
          </div>

          {/* CPU Threshold */}
          <div className="filter-group">
            <label>⚙️ CPU Tối Thiểu (vCPU)</label>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="16"
                value={filterCriteria.cpuThreshold}
                onChange={(e) =>
                  setFilterCriteria({
                    ...filterCriteria,
                    cpuThreshold: parseInt(e.target.value)
                  })
                }
                className="slider"
              />
              <span className="slider-value">{filterCriteria.cpuThreshold}</span>
            </div>
          </div>

          {/* Memory Threshold */}
          <div className="filter-group">
            <label>💾 Memory Tối Thiểu (GB)</label>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="64"
                step="2"
                value={filterCriteria.memoryThreshold}
                onChange={(e) =>
                  setFilterCriteria({
                    ...filterCriteria,
                    memoryThreshold: parseInt(e.target.value)
                  })
                }
                className="slider"
              />
              <span className="slider-value">{filterCriteria.memoryThreshold}</span>
            </div>
          </div>

          {/* Service Type Filter */}
          <div className="filter-group">
            <label>🔧 Loại Dịch Vụ</label>
            <select
              value={filterCriteria.serviceType}
              onChange={(e) =>
                setFilterCriteria({ ...filterCriteria, serviceType: e.target.value })
              }
            >
              <option value="all">Tất Cả</option>
              <option value="database">Database</option>
              <option value="web">Web Server</option>
              <option value="cache">Cache</option>
              <option value="api">API</option>
              <option value="worker">Worker</option>
            </select>
          </div>

          {/* Priority Score */}
          <div className="filter-group">
            <label>📊 Chiến Lược Ưu Tiên</label>
            <select
              value={filterCriteria.priorityScore}
              onChange={(e) =>
                setFilterCriteria({ ...filterCriteria, priorityScore: e.target.value })
              }
            >
              <option value="balanced">Cân Bằng</option>
              <option value="aggressive">Tích Cực</option>
              <option value="conservative">Bảo Thủ</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="filter-group action-group">
            <button className="btn-reset" onClick={resetFilters}>
              🔄 Reset
            </button>
            <button className="btn-export" onClick={exportFiltered}>
              📥 Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* === STATS SECTION === */}
      {stats.total !== undefined && (
        <div className="stats-section">
          <h3>📈 Thống Kê Kết Quả Lọc</h3>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-label">Tài Nguyên Được Chọn</div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-percent">
                  {((stats.total / resources.length) * 100).toFixed(1)}% tổng số
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⚙️</div>
              <div className="stat-info">
                <div className="stat-label">Tổng CPU / Trung Bình</div>
                <div className="stat-value">{stats.totalCPU} / {stats.avgCPU}</div>
                <div className="stat-unit">vCPU</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💾</div>
              <div className="stat-info">
                <div className="stat-label">Tổng Memory / Trung Bình</div>
                <div className="stat-value">{stats.totalMem} / {stats.avgMem}</div>
                <div className="stat-unit">GB</div>
              </div>
            </div>

            <div className="stat-card priority">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <div className="stat-label">Priority Index</div>
                <div className="stat-value">{stats.priorityIndex}</div>
                <div className="priority-bar">
                  <div
                    className="priority-fill"
                    style={{
                      width: `${Math.min(100, stats.priorityIndex)}%`,
                      backgroundColor: getPriorityColor(stats.priorityIndex)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Environment & Service Distribution */}
          <div className="distribution-grid">
            <div className="distribution-card">
              <h4>🌍 Phân Bố Môi Trường</h4>
              {Object.entries(stats.envCount).map(([env, count]) => (
                <div key={env} className="distribution-item">
                  <span className="distribution-label">{env}</span>
                  <div className="distribution-bar">
                    <div
                      className="distribution-fill"
                      style={{
                        width: `${(count / stats.total) * 100}%`
                      }}
                    />
                  </div>
                  <span className="distribution-count">{count}</span>
                </div>
              ))}
            </div>

            <div className="distribution-card">
              <h4>🔧 Phân Bố Loại Dịch Vụ</h4>
              {Object.entries(stats.serviceCount).length > 0 ? (
                Object.entries(stats.serviceCount).map(([service, count]) => (
                  <div key={service} className="distribution-item">
                    <span className="distribution-label">{service}</span>
                    <div className="distribution-bar">
                      <div
                        className="distribution-fill"
                        style={{
                          width: `${(count / stats.total) * 100}%`
                        }}
                      />
                    </div>
                    <span className="distribution-count">{count}</span>
                  </div>
                ))
              ) : (
                <p className="no-data">Không có dữ liệu</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === FILTERED RESOURCES TABLE === */}
      {filteredResources.length > 0 ? (
        <div className="results-section">
          <h3>📋 Kết Quả ({filteredResources.length} tài nguyên)</h3>
          <div className="results-table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>CPU</th>
                  <th>Memory</th>
                  <th>Môi Trường</th>
                  <th>Dịch Vụ</th>
                  <th>Phân Loại</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource, idx) => {
                  const score = (resource.cpu * 10 + resource.mem * 5).toFixed(0);
                  return (
                    <tr key={resource.id}>
                      <td className="index-col">{idx + 1}</td>
                      <td className="name-col">{resource.name}</td>
                      <td className="cpu-col">{resource.cpu}</td>
                      <td className="mem-col">{resource.mem}</td>
                      <td className="env-col">{resource.tags?.env || '-'}</td>
                      <td className="service-col">{resource.tags?.service || '-'}</td>
                      <td className="classification-col">
                        <span className="badge">{resource.classification || '-'}</span>
                      </td>
                      <td className="score-col">
                        <span
                          className="score-badge"
                          style={{
                            backgroundColor: getPriorityColor(score)
                          }}
                        >
                          {score}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="no-results">
          <p>❌ Không tìm thấy tài nguyên phù hợp với tiêu chí lọc</p>
          <p className="hint">Hãy thay đổi các filter để xem kết quả</p>
        </div>
      )}
    </div>
  );
}

export default DynamicClassifier;
