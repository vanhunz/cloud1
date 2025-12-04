import React, { useState, useEffect } from 'react';
import { getAllResources, classifyResources, getStats } from '../api/resourceApi';
import AnalyticsDashboard from './AnalyticsDashboard';
import './ResourceTable.css';

/**
 * Component hiển thị bảng tài nguyên và phân loại
 */
function ResourceTable() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [classified, setClassified] = useState(false);

  // Load dữ liệu khi component mount
  useEffect(() => {
    loadResources();
  }, []);

  /**
   * Load toàn bộ tài nguyên
   */
  const loadResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllResources();
      setResources(data);
      setClassified(false);
      setStats(null);
    } catch (err) {
      setError('Không thể tải dữ liệu. Hãy chắc chắn Backend đang chạy!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Phân loại toàn bộ tài nguyên
   */
  const handleClassify = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await classifyResources();
      console.log('Classify response:', response);
      
      // Backend trả về: {success, message, totalResources, resources}
      if (response.resources && Array.isArray(response.resources)) {
        setResources(response.resources);
        setClassified(true);
        
        // Tính stats từ classified resources
        const totalResources = response.resources.length;
        const classifiedCount = response.resources.filter(r => r.classification && r.classification !== 'Not Classified').length;
        
        setStats({
          totalResources,
          classified: classifiedCount,
          unclassified: totalResources - classifiedCount
        });
      } else {
        setError('Backend trả về dữ liệu không đúng định dạng');
      }
    } catch (err) {
      setError('Không thể phân loại. Kiểm tra Backend!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Lấy màu badge theo classification
   */
  const getClassificationBadge = (classification) => {
    if (!classification || classification === 'Not Classified') {
      return <span className="badge badge-gray">Chưa phân loại</span>;
    }

    let colorClass = 'badge-default';
    
    if (classification.includes('Production')) {
      colorClass = 'badge-red';
    } else if (classification.includes('Testing')) {
      colorClass = 'badge-blue';
    } else if (classification.includes('Staging')) {
      colorClass = 'badge-yellow';
    }

    if (classification.includes('Critical')) {
      colorClass = 'badge-red';
    }

    return <span className={`badge ${colorClass}`}>{classification}</span>;
  };

  /**
   * Lấy icon theo service type
   */
  const getServiceIcon = (classification) => {
    if (!classification) return '📦';
    if (classification.includes('Database')) return '🗄️';
    if (classification.includes('Caching')) return '⚡';
    if (classification.includes('Compute')) return '💻';
    if (classification.includes('Storage')) return '💾';
    if (classification.includes('Network')) return '🌐';
    return '📦';
  };

  return (
    <div className="resource-container">
      {/* Action Buttons */}
      <div className="action-bar">
        <button 
          className="btn btn-primary" 
          onClick={loadResources}
          disabled={loading}
        >
          {loading ? '⏳ Đang tải...' : '🔄 Load Data'}
        </button>
        
        <button 
          className="btn btn-success" 
          onClick={handleClassify}
          disabled={loading || resources.length === 0}
        >
          {loading ? '⏳ Đang xử lý...' : '🎯 Classify Resources'}
        </button>

        <div className="info-badge">
          📊 Tổng: <strong>{resources.length}</strong> tài nguyên
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          ❌ {error}
        </div>
      )}

      {/* Stats Panel */}
      {classified && stats && (
        <div className="stats-panel">
          <h3>📈 Thống kê phân loại</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Tổng số tài nguyên</div>
              <div className="stat-value">{stats.totalResources}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Production</div>
              <div className="stat-value prod">{stats.environmentCounts?.Production || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Testing</div>
              <div className="stat-value test">{stats.environmentCounts?.Testing || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Critical Resources</div>
              <div className="stat-value critical">{stats.criticalCount || 0}</div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Table */}
      {resources.length > 0 ? (
        <div className="table-wrapper">
          <table className="resource-table">
            <thead>
              <tr>
                <th>🆔 ID</th>
                <th>📛 Name</th>
                <th>⚙️ CPU (vCPU)</th>
                <th>💾 Memory (GB)</th>
                <th>🏷️ Tags</th>
                <th>📊 Classification</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id} className={classified ? 'classified' : ''}>
                  <td>{resource.id}</td>
                  <td>
                    <div className="resource-name">
                      {getServiceIcon(resource.classification)}
                      <span>{resource.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="cpu-badge">{resource.cpu}</span>
                  </td>
                  <td>
                    <span className="mem-badge">{resource.mem}</span>
                  </td>
                  <td>
                    <div className="tags">
                      {resource.tags && Object.keys(resource.tags).length > 0 ? (
                        Object.entries(resource.tags).map(([key, value]) => (
                          <span key={key} className="tag">
                            {key}: {value}
                          </span>
                        ))
                      ) : (
                        <span className="tag-empty">-</span>
                      )}
                    </div>
                  </td>
                  <td>
                    {getClassificationBadge(resource.classification)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <h2>📭 Chưa có dữ liệu</h2>
          <p>Nhấn "Load Data" để tải tài nguyên từ Backend</p>
        </div>
      )}

      {/* Info Box */}
      {!classified && resources.length > 0 && (
        <div className="alert alert-info">
          💡 <strong>Hướng dẫn:</strong> Nhấn nút "Classify Resources" để chạy Rule Engine và phân loại tài nguyên
        </div>
      )}

      {classified && (
        <div className="alert alert-success">
          ✅ <strong>Thành công!</strong> Đã phân loại {resources.length} tài nguyên bằng Rule Engine
        </div>
      )}

      {/* === ANALYTICS DASHBOARD === */}
      {classified && resources.length > 0 && (
        <AnalyticsDashboard resources={resources} />
      )}
    </div>
  );
}

export default ResourceTable;
